import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import {
    getAdminSummary,
    getRevenueOverTime,
    getRevenueByStore,
    getRecentOrders,
    getStoresList
} from '../../admin/services/adminApi';

// --- Helper Components (MUST be at the top) ---

const KPICard = ({ title, value, color, loading, tooltip }) => {
    const colorClasses = {
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
    };

    return (
        <div className={`p-6 rounded-2xl border ${colorClasses[color]} transition-transform hover:-translate-y-1 relative group`}>
            {tooltip && (
                <div className="absolute top-4 right-4 text-xs opacity-0 group-hover:opacity-60 transition-opacity cursor-help" title={tooltip}>
                    ℹ️
                </div>
            )}
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
            {loading ? (
                <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <p className={`text-3xl font-extrabold`}>{value}</p>
            )}
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        Preparing: 'bg-blue-100 text-blue-800 border border-blue-200',
        Delivered: 'bg-green-100 text-green-800 border border-green-200',
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const SkeletonChart = () => (
    <div className="w-full h-[90%] flex items-end justify-between px-4 pb-4 animate-pulse">
        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
            <div key={i} className="w-8 bg-gray-100 rounded-t-md" style={{ height: `${h}%` }}></div>
        ))}
    </div>
);

const SkeletonRow = () => (
    <tr>
        {[...Array(5)].map((_, i) => (
            <td key={i} className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-100 rounded w-24 animate-pulse"></div>
            </td>
        ))}
    </tr>
);

// --- Main Component ---

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeStore, setActiveStore] = useState('all');
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState({
        kpis: { totalRevenue: 0, activeOrders: 0, completedOrders: 0, totalStores: 0 },
        revenueOverTime: [],
        revenueByStore: [],
        recentOrders: []
    });

    // Initial Load - Get Stores
    useEffect(() => {
        const fetchStores = async () => {
            const data = await getStoresList();
            setStores(data);
        };
        fetchStores();
    }, []);

    // Fetch Dashboard Data when activeStore changes
    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            try {
                // Fetch all data in parallel using the service layer
                const [kpis, revenueTime, revenueStore, orders] = await Promise.all([
                    getAdminSummary(activeStore),
                    getRevenueOverTime(activeStore),
                    getRevenueByStore(), // Always global for comparison
                    getRecentOrders(activeStore)
                ]);

                setDashboardData({
                    kpis,
                    revenueOverTime: revenueTime,
                    revenueByStore: revenueStore,
                    recentOrders: orders
                });
            } catch (error) {
                console.error("Dashboard data load failed:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [activeStore]);

    const handleChartClick = (data) => {
        if (data && data.activePayload && data.activePayload[0]) {
            const clickedStoreId = data.activePayload[0].payload.storeId;
            if (clickedStoreId) {
                setActiveStore(clickedStoreId);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">
                        Overview for <span className="font-medium text-orange-600">
                            {stores.find(s => s.id === activeStore)?.name || 'All Stores'}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <select
                        value={activeStore}
                        onChange={(e) => setActiveStore(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-700 shadow-sm transition-all cursor-pointer hover:border-orange-300"
                    >
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>{store.name}</option>
                        ))}
                    </select>

                    <button
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium shadow-md hover:bg-orange-700 transition-colors transform active:scale-95"
                        onClick={() => alert(`Report for ${activeStore} generated!`)}
                    >
                        Download Report
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Total Revenue"
                    value={`₹${dashboardData.kpis.totalRevenue.toLocaleString()}`}
                    color="orange"
                    loading={loading}
                    tooltip="Total earnings from delivered orders"
                />
                <KPICard
                    title="Active Orders"
                    value={dashboardData.kpis.activeOrders}
                    color="blue"
                    loading={loading}
                    tooltip="Orders currently Pending or Preparing"
                />
                <KPICard
                    title="Completed Orders"
                    value={dashboardData.kpis.completedOrders}
                    color="green"
                    loading={loading}
                    tooltip="Successfully delivered orders"
                />
                <KPICard
                    title="Total Stores"
                    value={dashboardData.kpis.totalStores}
                    color="purple"
                    loading={loading}
                    tooltip="Number of stores included in this view"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue Line Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Trend</h3>
                    {loading ? <SkeletonChart /> : (
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={dashboardData.revenueOverTime}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(val) => [`₹${val}`, 'Revenue']}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, fill: '#ea580c', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Revenue by Store Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Store Performance</h3>
                        <span className="text-xs text-gray-400 font-medium">Click bar to filter</span>
                    </div>
                    {loading ? <SkeletonChart /> : (
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={dashboardData.revenueByStore} onClick={handleChartClick}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                                <Tooltip
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(val) => [`₹${val}`, 'Revenue']}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#3b82f6"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                    <span className="text-sm text-gray-500">{dashboardData.recentOrders.length} orders found</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Store Location</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                <>
                                    {dashboardData.recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.storeName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))}
                                    {dashboardData.recentOrders.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                No orders found for this selection.
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
