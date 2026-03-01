// Error types
export type ErrorType = 
  | 'validation'
  | 'storage'
  | 'migration'
  | 'not_found'
  | 'configuration';

export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: Date;
}
