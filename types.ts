
export enum ErrorType {
  SUCCESS = "SUCCESS",
  INVALID_API_KEY = "INVALID_API_KEY",
  INVALID_MODEL = "INVALID_MODEL",
  SAFETY_BLOCK = "SAFETY_BLOCK",
  NETWORK_ERROR = "NETWORK_ERROR", // This is conceptually handled by the catch block
}

export const errorTypeDetails: Record<ErrorType, { label: string; description: string }> = {
  [ErrorType.SUCCESS]: {
    label: "Successful Call",
    description: "A normal, successful API call to Gemini.",
  },
  [ErrorType.INVALID_API_KEY]: {
    label: "Invalid API Key",
    description: "Simulates using a malformed or incorrect API key.",
  },
  [ErrorType.INVALID_MODEL]: {
    label: "Invalid Model Name",
    description: "Simulates requesting a model that does not exist.",
  },
  [ErrorType.SAFETY_BLOCK]: {
    label: "Content Safety Block",
    description: "Simulates a prompt that violates safety policies.",
  },
  [ErrorType.NETWORK_ERROR]: {
    label: "Network/Fetch Error",
    description: "Shows how general network errors are caught.",
  },
};
