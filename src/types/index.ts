/**
*API Error Types
*/
export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
    statusCode: number;
}
/**
*End API Error Types
*/