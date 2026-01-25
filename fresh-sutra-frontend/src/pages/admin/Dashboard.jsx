import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-10 min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
                <p className="text-neutral-500 mb-8">Welcome back, {user?.name}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat Card 1 */}
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <h3 className="text-lg font-semibold text-orange-900 mb-1">Total Orders</h3>
                        <p className="text-3xl font-bold text-orange-600">0</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-lg font-semibold text-green-900 mb-1">Active Stores</h3>
                        <p className="text-3xl font-bold text-green-600">0</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-900 mb-1">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">0</p>
                    </div>
                </div>

                <div className="mt-10 p-10 bg-gray-50 rounded-xl text-center border border-dashed border-gray-300">
                    <p className="text-gray-500">Dashboard features coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
