import React from 'react';
import Sidebar from './components/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
                <div className="mt-10"></div>
                {children}
            </main>
        </div>
    );
}
