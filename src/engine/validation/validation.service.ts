/**
 * VideoMorph Engine - Validation Service
 * Unified verification module checking input files and output quality.
 */

export class EngineValidationService {
  /**
   * Supported video and audio file extensions
   */
  static SUPPORTED_EXTENSIONS = new Set([
    "MP4",
    "MOV",
    "MKV",
    "WEBM",
    "AVI",
    "WMV",
    "FLV",
    "3GP",
    "M4V",
    "TS",
    "MP3",
    "WAV",
    "AAC",
    "FLAC",
    "OGG",
    "M4A",
    "GIF",
  ]);

  /**
   * Check if a file is supported
   */
  static isSupportedFile(file: File): { supported: boolean; reason?: string } {
    if (!file || file.size === 0) {
      return { supported: false, reason: "File is empty (0 bytes)." };
    }

    const ext = file.name.split(".").pop()?.toUpperCase() || "";
    if (!this.SUPPORTED_EXTENSIONS.has(ext)) {
      return {
        supported: false,
        reason: `Format '.${ext.toLowerCase()}' is not supported by VideoMorph Engine.`,
      };
    }

    return { supported: true };
  }

  /**
   * Quality verification for generated output
   */
  static validateOutputQuality(
    outputData: Uint8Array,
    targetFormat: string,
    inputSizeBytes?: number,
  ): { isValid: boolean; error?: string } {
    if (!outputData || outputData.length < 512) {
      return {
        isValid: false,
        error: "Conversion output is corrupted or under 512 bytes.",
      };
    }

    const fmt = targetFormat.toUpperCase();

    // Catch suspiciously small outputs (e.g. 228 KB output for a 36 MB input)
    if (inputSizeBytes && inputSizeBytes > 2 * 1024 * 1024 && fmt !== "MP3" && fmt !== "GIF") {
      if (outputData.length < 50 * 1024) {
        return {
          isValid: false,
          error: `Conversion produced a suspiciously small output (${(
            outputData.length / 1024
          ).toFixed(1)} KB) for a ${(inputSizeBytes / (1024 * 1024)).toFixed(
            1,
          )} MB input file. Quality verification failed.`,
        };
      }
    }

    // MP4 / MOV header validation
    if (fmt === "MP4" || fmt === "MOV" || fmt === "M4V") {
      const headerStr = String.fromCharCode.apply(null, Array.from(outputData.subarray(0, 100)));
      if (
        !headerStr.includes("ftyp") &&
        !headerStr.includes("moov") &&
        !headerStr.includes("mdat") &&
        !headerStr.includes("wide")
      ) {
        return {
          isValid: false,
          error: "Output file lacks valid MP4/MOV container header signatures.",
        };
      }
    }

    // WEBM / MKV signature validation (0x1A45DFA3)
    if (fmt === "WEBM" || fmt === "MKV") {
      const isEBML =
        outputData[0] === 0x1a &&
        outputData[1] === 0x45 &&
        outputData[2] === 0xdf &&
        outputData[3] === 0xa3;
      if (!isEBML) {
        return {
          isValid: false,
          error: "Output file lacks valid WebM/MKV container signature.",
        };
      }
    }

    // GIF header signature
    if (fmt === "GIF") {
      const headerStr = String.fromCharCode.apply(null, Array.from(outputData.subarray(0, 6)));
      if (!headerStr.startsWith("GIF8")) {
        return {
          isValid: false,
          error: "Output file lacks valid GIF header signature.",
        };
      }
    }

    return { isValid: true };
  }
}
