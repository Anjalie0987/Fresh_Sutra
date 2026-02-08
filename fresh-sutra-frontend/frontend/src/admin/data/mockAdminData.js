
export const stores = [
    { id: 'all', name: 'All Stores' },
    { id: 'connaught_place', name: 'Connaught Place' },
    { id: 'dwarka_sec10', name: 'Dwarka Sector 10' },
    { id: 'khan_market', name: 'Khan Market' },
    { id: 'karol_bagh', name: 'Karol Bagh' }
];

export const orders = [
    // Connaught Place Orders
    { id: 'ORD-CP-001', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 450, status: 'Delivered', createdAt: '2023-10-20' },
    { id: 'ORD-CP-002', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 120, status: 'Pending', createdAt: '2023-10-21' },
    { id: 'ORD-CP-003', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 890, status: 'Delivered', createdAt: '2023-10-22' },
    { id: 'ORD-CP-004', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 250, status: 'Preparing', createdAt: '2023-10-23' },
    { id: 'ORD-CP-005', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 330, status: 'Delivered', createdAt: '2023-10-24' },
    { id: 'ORD-CP-006', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 150, status: 'Delivered', createdAt: '2023-10-24' },

    // Dwarka Sector 10 Orders
    { id: 'ORD-DW-001', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 200, status: 'Delivered', createdAt: '2023-10-20' },
    { id: 'ORD-DW-002', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 450, status: 'Pending', createdAt: '2023-10-21' },
    { id: 'ORD-DW-003', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 120, status: 'Delivered', createdAt: '2023-10-22' },
    { id: 'ORD-DW-004', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 600, status: 'Preparing', createdAt: '2023-10-23' },
    { id: 'ORD-DW-005', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 180, status: 'Delivered', createdAt: '2023-10-24' },

    // Khan Market Orders
    { id: 'ORD-KM-001', storeId: 'khan_market', storeName: 'Khan Market', amount: 1200, status: 'Delivered', createdAt: '2023-10-20' },
    { id: 'ORD-KM-002', storeId: 'khan_market', storeName: 'Khan Market', amount: 950, status: 'Pending', createdAt: '2023-10-21' },
    { id: 'ORD-KM-003', storeId: 'khan_market', storeName: 'Khan Market', amount: 450, status: 'Delivered', createdAt: '2023-10-22' },
    { id: 'ORD-KM-004', storeId: 'khan_market', storeName: 'Khan Market', amount: 300, status: 'Preparing', createdAt: '2023-10-23' },
    { id: 'ORD-KM-005', storeId: 'khan_market', storeName: 'Khan Market', amount: 2100, status: 'Delivered', createdAt: '2023-10-24' },
    { id: 'ORD-KM-006', storeId: 'khan_market', storeName: 'Khan Market', amount: 760, status: 'Pending', createdAt: '2023-10-24' },

    // Karol Bagh Orders
    { id: 'ORD-KB-001', storeId: 'karol_bagh', storeName: 'Karol Bagh', amount: 320, status: 'Delivered', createdAt: '2023-10-20' },
    { id: 'ORD-KB-002', storeId: 'karol_bagh', storeName: 'Karol Bagh', amount: 180, status: 'Pending', createdAt: '2023-10-21' },
    { id: 'ORD-KB-003', storeId: 'karol_bagh', storeName: 'Karol Bagh', amount: 450, status: 'Delivered', createdAt: '2023-10-22' },
    { id: 'ORD-KB-004', storeId: 'karol_bagh', storeName: 'Karol Bagh', amount: 290, status: 'Delivered', createdAt: '2023-10-23' },
    { id: 'ORD-KB-005', storeId: 'karol_bagh', storeName: 'Karol Bagh', amount: 550, status: 'Preparing', createdAt: '2023-10-24' },

    // More Orders for robustness
    { id: 'ORD-CP-007', storeId: 'connaught_place', storeName: 'Connaught Place', amount: 620, status: 'Delivered', createdAt: '2023-10-25' },
    { id: 'ORD-DW-006', storeId: 'dwarka_sec10', storeName: 'Dwarka Sector 10', amount: 330, status: 'Pending', createdAt: '2023-10-25' },
    { id: 'ORD-KM-007', storeId: 'khan_market', storeName: 'Khan Market', amount: 880, status: 'Delivered', createdAt: '2023-10-25' },
];
