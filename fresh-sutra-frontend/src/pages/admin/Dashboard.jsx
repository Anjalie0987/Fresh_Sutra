import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend
} from 'recharts';
import { vendors } from '../../mock/mockData';
import { fetchDashboardData } from '../../mock/mockApi';
import { calculateKPIs, revenueByDate, revenueByVendor } from '../../utils/dashboardUtils';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [selectedVendor, setSelectedVendor] = useState('all');
    const [dashboardData, setDashboardData] = useState({
        orders: [],
        kpis: { totalRevenue: 0, activeOrders: 0, completedOrders: 0, totalCustomers: 0 },
        charts: { revenueOverTime: [], revenueByVendor: [] }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const orders = await fetchDashboardData({ vendorId: selectedVendor });
                const kpis = calculateKPIs(orders);
                const revenueOverTime = revenueByDate(orders);
                const revenueByVendorData = revenueByVendor(orders);

                setDashboardData({
                    orders,
                    kpis,
                    charts: { revenueOverTime, revenueByVendor: revenueByVendorData }
                });
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedVendor]);

    const handleDownloadReport = () => {
        const vendorName = vendors.find(v => v.id === selectedVendor)?.name || 'All Stores';
        alert(`Generating report for: ${vendorName}\n(This is a mock action)`);
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, <span className="font-medium text-orange-600">{user?.name}</span></p>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <select
                        value={selectedVendor}
                        onChange={(e) => setSelectedVendor(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-gray-700 shadow-sm transition-all"
                    >
                        {vendors.map(vendor => (
                            <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleDownloadReport}
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium shadow-md hover:bg-orange-700 transition-colors transform active:scale-95"
                    >
                        Download Report
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading Dashboard...</p>
                </div>
            ) : (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <KPICard title="Total Revenue" value={`₹${dashboardData.kpis.totalRevenue.toLocaleString()}`} color="orange" />
                        <KPICard title="Active Orders" value={dashboardData.kpis.activeOrders} color="blue" />
                        <KPICard title="Completed Orders" value={dashboardData.kpis.completedOrders} color="green" />
                        <KPICard title="Total Customers" value={dashboardData.kpis.totalCustomers} color="purple" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Revenue Line Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Over Time</h3>
                            <ResponsiveContainer width="100%" height="90%">
                                <LineChart data={dashboardData.charts.revenueOverTime}>
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
                        </div>

                        {/* Revenue by Vendor Bar Chart */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue by Vendor</h3>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart data={dashboardData.charts.revenueByVendor}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        formatter={(val) => [`₹${val}`, 'Revenue']}
                                    />
                                    <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dashboardData.orders.slice(0, 5).map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.vendorName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt}</td>
                                        </tr>
                                    ))}
                                    {dashboardData.orders.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                                No orders found for this selection.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Helper Components
const KPICard = ({ title, value, color }) => {
    const colorClasses = {
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
    };

    return (
        <div className={`p-6 rounded-2xl border ${colorClasses[color]} transition-transform hover:-translate-y-1`}>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
            <p className={`text-3xl font-extrabold`}>{value}</p>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Preparing: 'bg-blue-100 text-blue-800',
        Delivered: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

export default AdminDashboard;
