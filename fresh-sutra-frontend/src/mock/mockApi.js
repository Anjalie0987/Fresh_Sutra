import { orders } from './mockData';

export const fetchDashboardData = ({ vendorId }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredOrders = orders;

            if (vendorId && vendorId !== 'all') {
                filteredOrders = orders.filter(order => order.vendorId === vendorId);
            }

            resolve(filteredOrders);
        }, 500); // Simulate network delay
    });
};
