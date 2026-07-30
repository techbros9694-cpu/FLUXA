export interface DevicePerformanceProfile {
  cores: number;
  memoryGb: number;
  isMobile: boolean;
  isLowEnd: boolean;
  recommendedThreads: number;
  recommendedPreset: string;
}

export class PerformanceService {
  private static cachedProfile: DevicePerformanceProfile | null = null;

  /**
   * Detect hardware capabilities and return adaptive performance profile
   */
  static getDeviceProfile(): DevicePerformanceProfile {
    if (this.cachedProfile) {
      return this.cachedProfile;
    }

    let cores = 4;
    let memoryGb = 4;
    let isMobile = false;

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      if (navigator.hardwareConcurrency) {
        cores = Math.max(1, navigator.hardwareConcurrency);
      }

      // @ts-expect-error deviceMemory is supported in Chrome/Edge
      if (navigator.deviceMemory) {
        // @ts-expect-error deviceMemory is supported in Chrome/Edge
        memoryGb = navigator.deviceMemory;
      }

      const ua = navigator.userAgent || "";
      isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ||
        (navigator.maxTouchPoints > 0 && /Macintosh/i.test(ua)); // iPad OS check
    }

    const isLowEnd = cores <= 4 || memoryGb <= 4 || isMobile;

    // Determine thread count for FFmpeg WASM
    const recommendedThreads = Math.min(8, Math.max(1, cores));

    // Recommend encoding preset based on hardware
    const recommendedPreset = isLowEnd ? "ultrafast" : "superfast";

    this.cachedProfile = {
      cores,
      memoryGb,
      isMobile,
      isLowEnd,
      recommendedThreads,
      recommendedPreset,
    };

    return this.cachedProfile;
  }
}
