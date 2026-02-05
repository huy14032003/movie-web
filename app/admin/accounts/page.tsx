"use client";
import React, { useState } from 'react';
import { Edit, Trash2, Ban, UserPlus, Search, Filter } from 'lucide-react';
import { User, UserRole, UserStatus } from '@/types/admin';

// Mock users data
const mockUsers: User[] = [
    { id: '1', username: 'admin', email: 'admin@movieapp.com', role: UserRole.ADMIN, status: UserStatus.ACTIVE, createdAt: '2024-01-01', lastLogin: '2 giờ trước' },
    { id: '2', username: 'moderator1', email: 'mod1@movieapp.com', role: UserRole.MODERATOR, status: UserStatus.ACTIVE, createdAt: '2024-01-15', lastLogin: '1 ngày trước' },
    { id: '3', username: 'user123', email: 'user123@email.com', role: UserRole.USER, status: UserStatus.ACTIVE, createdAt: '2024-02-01', lastLogin: '5 phút trước' },
    { id: '4', username: 'user456', email: 'user456@email.com', role: UserRole.USER, status: UserStatus.BANNED, createdAt: '2024-01-20', lastLogin: '1 tuần trước' },
    { id: '5', username: 'user789', email: 'user789@email.com', role: UserRole.USER, status: UserStatus.INACTIVE, createdAt: '2023-12-01', lastLogin: '1 tháng trước' },
];

const roleColors = {
    [UserRole.ADMIN]: 'bg-red-500/10 text-red-500 border-red-500/20',
    [UserRole.MODERATOR]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    [UserRole.USER]: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const roleLabels = {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.MODERATOR]: 'Moderator',
    [UserRole.USER]: 'User',
};

const statusColors = {
    [UserStatus.ACTIVE]: 'bg-green-500/10 text-green-500 border-green-500/20',
    [UserStatus.BANNED]: 'bg-red-500/10 text-red-500 border-red-500/20',
    [UserStatus.INACTIVE]: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const statusLabels = {
    [UserStatus.ACTIVE]: 'Hoạt động',
    [UserStatus.BANNED]: 'Bị cấm',
    [UserStatus.INACTIVE]: 'Không hoạt động',
};

const AccountsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch =
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleBan = (userId: string) => {
        if (confirm('Bạn có chắc muốn cấm user này?')) {
            console.log('Ban user:', userId);
            // TODO: API call
        }
    };

    const handleDelete = (userId: string) => {
        if (confirm('Bạn có chắc muốn xóa user này?')) {
            console.log('Delete user:', userId);
            // TODO: API call
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Quản Lý Tài Khoản
                    </h1>
                    <p className="text-gray-400 mt-2">{filteredUsers.length} tài khoản</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <UserPlus size={18} />
                    Thêm User
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                    />
                </div>

                {/* Role Filter */}
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                >
                    <option value="all">Tất cả vai trò</option>
                    <option value={UserRole.ADMIN}>Admin</option>
                    <option value={UserRole.MODERATOR}>Moderator</option>
                    <option value={UserRole.USER}>User</option>
                </select>

                {/* Status Filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value={UserStatus.ACTIVE}>Hoạt động</option>
                    <option value={UserStatus.BANNED}>Bị cấm</option>
                    <option value={UserStatus.INACTIVE}>Không hoạt động</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Vai trò</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Trạng thái</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Đăng ký</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Đăng nhập</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <h3 className="text-white font-semibold">{user.username}</h3>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleColors[user.role]}`}>
                                            {roleLabels[user.role]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[user.status]}`}>
                                            {statusLabels[user.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {user.lastLogin || 'Chưa đăng nhập'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            {user.status !== UserStatus.BANNED && (
                                                <button
                                                    onClick={() => handleBan(user.id)}
                                                    className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                                                    title="Cấm"
                                                >
                                                    <Ban size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountsPage;
