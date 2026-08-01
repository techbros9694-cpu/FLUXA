/**
 * VideoMorph Engine - Queue System
 * Flexible job queue for single or batch media processing operations.
 */

import {
  JobStatus,
  EngineProgressState,
  EngineResult,
  ProgressCallback,
  AnyEngineOperationOptions,
} from "../types/engine.types";

export interface QueueJob {
  id: string;
  operationOptions: AnyEngineOperationOptions;
  status: JobStatus;
  progress: EngineProgressState;
  result?: EngineResult;
  error?: string;
  addedAt: number;
}

export class JobQueue {
  private jobs: Map<string, QueueJob> = new Map();
  private activeJobId: string | null = null;
  private isPaused: boolean = false;
  private progressListeners: Set<ProgressCallback> = new Set();

  /**
   * Enqueue a new processing job
   */
  enqueue(options: AnyEngineOperationOptions): QueueJob {
    const id = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const job: QueueJob = {
      id,
      operationOptions: options,
      status: "queued",
      progress: {
        jobId: id,
        percentage: 0,
        timeSeconds: 0,
        etaSeconds: 0,
        stage: "Queued",
        statusText: "Waiting in processing queue...",
      },
      addedAt: Date.now(),
    };

    this.jobs.set(id, job);
    return job;
  }

  /**
   * Get a job by ID
   */
  getJob(id: string): QueueJob | undefined {
    return this.jobs.get(id);
  }

  /**
   * List all queued or completed jobs
   */
  getAllJobs(): QueueJob[] {
    return Array.from(this.jobs.values());
  }

  /**
   * Update progress for a job
   */
  updateProgress(jobId: string, progress: EngineProgressState): void {
    const job = this.jobs.get(jobId);
    if (job) {
      job.progress = progress;
      if (progress.percentage > 0 && progress.percentage < 100) {
        job.status = "processing";
      }
      this.notifyListeners(progress);
    }
  }

  /**
   * Mark job completed
   */
  markCompleted(jobId: string, result: EngineResult): void {
    const job = this.jobs.get(jobId);
    if (job) {
      job.status = "completed";
      job.result = result;
      job.progress.percentage = 100;
      job.progress.stage = "Completed";
      job.progress.statusText = "Processing completed successfully!";
      this.notifyListeners(job.progress);
    }
  }

  /**
   * Mark job failed
   */
  markFailed(jobId: string, errorMsg: string): void {
    const job = this.jobs.get(jobId);
    if (job) {
      job.status = "failed";
      job.error = errorMsg;
      job.progress.stage = "Failed";
      job.progress.statusText = errorMsg;
      this.notifyListeners(job.progress);
    }
  }

  /**
   * Cancel a job
   */
  cancelJob(jobId: string): void {
    const job = this.jobs.get(jobId);
    if (job) {
      job.status = "cancelled";
      job.progress.stage = "Cancelled";
      job.progress.statusText = "Job cancelled by user.";
    }
  }

  /**
   * Pause/Resume
   */
  setPaused(paused: boolean): void {
    this.isPaused = paused;
  }

  getPaused(): boolean {
    return this.isPaused;
  }

  /**
   * Add progress event listener
   */
  subscribeProgress(cb: ProgressCallback): () => void {
    this.progressListeners.add(cb);
    return () => this.progressListeners.delete(cb);
  }

  private notifyListeners(progress: EngineProgressState): void {
    this.progressListeners.forEach((cb) => cb(progress));
  }

  /**
   * Clear all jobs
   */
  clear(): void {
    this.jobs.clear();
    this.activeJobId = null;
  }
}
