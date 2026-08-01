import { ValidationError } from "@/types/converter";

export const SUPPORTED_INPUT_EXTENSIONS = [
  "mp4",
  "mov",
  "mkv",
  "avi",
  "webm",
  "wmv",
  "flv",
  "mpeg",
  "mpg",
  "m4v",
  "ogv",
  "ts",
  "mts",
  "3gp",
];

export class ValidationService {
  /**
   * Validate uploaded video file before accepting
   */
  static validateFile(file: File | null | undefined): {
    isValid: boolean;
    error?: ValidationError;
  } {
    if (!file) {
      return {
        isValid: false,
        error: {
          title: "No file selected",
          message: "Please choose or drop a valid video file to begin.",
        },
      };
    }

    if (file.size === 0) {
      return {
        isValid: false,
        error: {
          title: "Empty File",
          message: "The selected file is empty (0 bytes). Please upload a valid media file.",
        },
      };
    }

    // Extract file extension
    const nameParts = file.name.split(".");
    const ext = nameParts.length > 1 ? nameParts.pop()?.toLowerCase() || "" : "";

    const isSupportedExt = SUPPORTED_INPUT_EXTENSIONS.includes(ext);
    const isVideoMime =
      file.type.startsWith("video/") || file.type.startsWith("audio/") || file.type === "image/gif";

    if (!isSupportedExt && !isVideoMime) {
      return {
        isValid: false,
        error: {
          title: "Unsupported Format",
          message: `.${ext.toUpperCase() || "unknown"} is not supported. Please upload one of: ${SUPPORTED_INPUT_EXTENSIONS.map((e) => e.toUpperCase()).join(", ")}.`,
        },
      };
    }

    return { isValid: true };
  }

  /**
   * Check if browser environment supports WebAssembly
   */
  static checkBrowserCapabilities(): { supported: boolean; reason?: string } {
    if (typeof window === "undefined") {
      return { supported: false, reason: "Server-side rendering environment detected." };
    }

    if (typeof WebAssembly === "undefined") {
      return {
        supported: false,
        reason: "Your browser does not support WebAssembly required for client-side conversion.",
      };
    }

    return { supported: true };
  }

  /**
   * Validate converted output buffer
   */
  static validateConvertedOutput(
    outputData: Uint8Array,
    targetFormat: string,
    inputSizeBytes?: number,
  ): { isValid: boolean; error?: string } {
    if (!outputData || outputData.length < 512) {
      return {
        isValid: false,
        error: "Output file size is invalid (under 512 bytes).",
      };
    }

    const fmt = targetFormat.toUpperCase();

    // Check for suspiciously small output files (e.g., 228 KB output for a 36 MB input)
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

    // MP4 / MOV / M4V container header check
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

    // WEBM / MKV EBML signature check
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

    // GIF header check
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
