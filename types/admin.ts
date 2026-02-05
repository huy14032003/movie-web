import { Movie } from './movie';

export enum MovieStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    PENDING = 'pending',
    REJECTED = 'rejected'
}

export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user'
}

export enum UserStatus {
    ACTIVE = 'active',
    BANNED = 'banned',
    INACTIVE = 'inactive'
}

export interface AdminMovie extends Movie {
    status: MovieStatus;
    views: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    moderationNotes?: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    lastLogin?: string;
}

export interface DashboardStats {
    totalMovies: number;
    pendingMovies: number;
    todayViews: number;
    totalUsers: number;
}

export interface ViewsData {
    date: string;
    views: number;
}

export interface TopMovie {
    id: string;
    title: string;
    poster: string;
    views: number;
    rating: number;
}

export interface ActivityLog {
    id: string;
    action: string;
    user: string;
    target: string;
    timestamp: string;
}
