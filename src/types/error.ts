// 统一错误类型定义

export type ErrorType =
  | 'NETWORK_ERROR'
  | 'INVALID_ASIN'
  | 'ANALYSIS_FAILED'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR';

export interface AppError {
  type: ErrorType;
  message: string;
  code?: number;
}