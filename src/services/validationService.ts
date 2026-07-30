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
}
