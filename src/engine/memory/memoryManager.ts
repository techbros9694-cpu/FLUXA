/**
 * VideoMorph Engine - Memory Manager
 * Automatically tracks and releases memory, Blob URLs, and virtual files to prevent memory leaks.
 */

export class MemoryManager {
  private static activeObjectUrls: Set<string> = new Set();

  /**
   * Register a Blob URL for automated lifecycle tracking
   */
  static registerUrl(url: string): string {
    this.activeObjectUrls.add(url);
    return url;
  }

  /**
   * Revoke a registered Blob URL
   */
  static revokeUrl(url: string): void {
    if (this.activeObjectUrls.has(url)) {
      URL.revokeObjectURL(url);
      this.activeObjectUrls.delete(url);
    }
  }

  /**
   * Clean up all active Blob URLs managed by the engine
   */
  static cleanupAllUrls(): void {
    this.activeObjectUrls.forEach((url) => {
      try {
        URL.revokeObjectURL(url);
      } catch {
        // ignore
      }
    });
    this.activeObjectUrls.clear();
  }

  /**
   * Safely wipe ArrayBuffers or TypedArrays from memory
   */
  static wipeBuffer(buffer: ArrayBuffer | Uint8Array | null): void {
    if (!buffer) return;
    if (buffer instanceof Uint8Array) {
      buffer.fill(0);
    }
  }
}
