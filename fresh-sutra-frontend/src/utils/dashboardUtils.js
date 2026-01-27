
export const calculateKPIs = (orders) => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status === 'Delivered' ? order.amount : 0), 0);
    const activeOrders = orders.filter(order => order.status === 'Pending' || order.status === 'Preparing').length;
    const completedOrders = orders.filter(order => order.status === 'Delivered').length;

    // Mock customer count (unique mock users could be inferred, but simple count is fine for prototype)
    const uniqueCustomers = new Set(orders.map(o => o.id)).size;

    return {
        totalRevenue,
        activeOrders,
        completedOrders,
        totalCustomers: uniqueCustomers + 120 // Adding base customer base for realsism
    };
};

export const revenueByDate = (orders) => {
    const grouped = orders.reduce((acc, order) => {
        if (order.status !== 'Delivered') return acc;

        const date = order.createdAt;
        acc[date] = (acc[date] || 0) + order.amount;
        return acc;
    }, {});

    return Object.keys(grouped)
        .sort()
        .map(date => ({
            date,
            revenue: grouped[date]
        }));
};

export const revenueByVendor = (orders) => {
    const grouped = orders.reduce((acc, order) => {
        if (order.status !== 'Delivered') return acc;

        acc[order.vendorName] = (acc[order.vendorName] || 0) + order.amount;
        return acc;
    }, {});

    return Object.keys(grouped).map(vendor => ({
        name: vendor,
        revenue: grouped[vendor]
    }));
};
