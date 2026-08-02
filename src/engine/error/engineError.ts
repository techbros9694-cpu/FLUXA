/**
 * FLUXA Engine - Error Taxonomy
 * Centralized error handler and standard exception classes.
 */

export class VideoMorphError extends Error {
  constructor(
    message: string,
    public code: string = "ENGINE_ERROR",
    public details?: unknown,
  ) {
    super(message);
    this.name = "VideoMorphError";
  }
}

export class InvalidFileError extends VideoMorphError {
  constructor(message: string, details?: unknown) {
    super(message, "INVALID_FILE", details);
    this.name = "InvalidFileError";
  }
}

export class IncompatibleCodecError extends VideoMorphError {
  constructor(message: string, details?: unknown) {
    super(message, "INCOMPATIBLE_CODEC", details);
    this.name = "IncompatibleCodecError";
  }
}

export class WorkerExecutionError extends VideoMorphError {
  constructor(message: string, details?: unknown) {
    super(message, "WORKER_EXECUTION_ERROR", details);
    this.name = "WorkerExecutionError";
  }
}

export class QualityValidationError extends VideoMorphError {
  constructor(message: string, details?: unknown) {
    super(message, "QUALITY_VALIDATION_ERROR", details);
    this.name = "QualityValidationError";
  }
}

export class MemoryLimitError extends VideoMorphError {
  constructor(message: string, details?: unknown) {
    super(message, "MEMORY_LIMIT_ERROR", details);
    this.name = "MemoryLimitError";
  }
}

export class EngineErrorHandler {
  static handle(err: unknown): VideoMorphError {
    if (err instanceof VideoMorphError) {
      return err;
    }
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("memory") || message.includes("OOM")) {
      return new MemoryLimitError(
        "Browser memory limit reached during processing. Please close other tabs and try again.",
        err,
      );
    }
    if (message.includes("FFmpeg worker") || message.includes("Worker")) {
      return new WorkerExecutionError(
        "FFmpeg worker processing failed. FLUXA fallback re-encoding will take over.",
        err,
      );
    }
    return new VideoMorphError(
      message || "An unexpected engine error occurred.",
      "UNKNOWN_ERROR",
      err,
    );
  }
}
