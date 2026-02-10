export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
    success: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    first: boolean;
    last: boolean;
}

export interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
}

export interface QueryParams {
    page?: number;
    size?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
}
