import { orders, stores } from '../data/mockAdminData';

const DELAY_MS = 400;

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get global summary KPIs
 * Filters by storeId if provided, otherwise returns global aggregations.
 */
export const getAdminSummary = async (storeId) => {
    await delay(DELAY_MS);

    let filteredOrders = orders;
    if (storeId && storeId !== 'all') {
        filteredOrders = orders.filter(o => o.storeId === storeId);
    }

    const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.status === 'Delivered' ? o.amount : 0), 0);
    const activeOrders = filteredOrders.filter(o => ['Pending', 'Preparing'].includes(o.status)).length;
    const completedOrders = filteredOrders.filter(o => o.status === 'Delivered').length;

    return {
        totalRevenue,
        activeOrders,
        completedOrders,
        totalStores: storeId && storeId !== 'all' ? 1 : stores.length - 1 // Subtract 'All Stores'
    };
};

/**
 * Get Revenue Over Time (for Line Chart)
 * Aggregates revenue by date. Filters by storeId.
 */
export const getRevenueOverTime = async (storeId) => {
    await delay(DELAY_MS);

    let filteredOrders = orders.filter(o => o.status === 'Delivered');
    if (storeId && storeId !== 'all') {
        filteredOrders = filteredOrders.filter(o => o.storeId === storeId);
    }

    const grouped = filteredOrders.reduce((acc, order) => {
        const date = order.createdAt;
        acc[date] = (acc[date] || 0) + order.amount;
        return acc;
    }, {});

    return Object.keys(grouped).sort().map(date => ({
        date,
        revenue: grouped[date]
    }));
};

/**
 * Get Revenue By Store (for Bar Chart)
 * Returns total revenue per store. Ignores storeId filter (this chart usually shows all or comparison).
 */
export const getRevenueByStore = async () => {
    await delay(DELAY_MS);

    const filteredOrders = orders.filter(o => o.status === 'Delivered');

    const grouped = filteredOrders.reduce((acc, order) => {
        acc[order.storeName] = (acc[order.storeName] || 0) + order.amount;
        return acc;
    }, {});

    // Ensure all stores (except 'All') are represented even if 0 revenue
    const allStoreNames = stores.filter(s => s.id !== 'all').map(s => s.name);

    return allStoreNames.map(name => ({
        name,
        revenue: grouped[name] || 0,
        storeId: stores.find(s => s.name === name)?.id // include ID for click handling
    }));
};

/**
 * Get Recent Orders
 * Filters by storeId. Sorts by date desc.
 */
export const getRecentOrders = async (storeId) => {
    await delay(DELAY_MS);

    let filteredOrders = orders;
    if (storeId && storeId !== 'all') {
        filteredOrders = orders.filter(o => o.storeId === storeId);
    }

    // Sort by most recent (assuming logical ID or date structure, here simplified)
    // In real app, verify 'createdAt' sorting
    return [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getStoresList = async () => {
    await delay(DELAY_MS / 2); // Faster
    return stores;
};
