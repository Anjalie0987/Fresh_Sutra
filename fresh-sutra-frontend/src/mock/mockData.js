
export const vendors = [
    { id: 'all', name: 'All Stores' },
    { id: 'v1', name: 'Vendor A' },
    { id: 'v2', name: 'Vendor B' },
    { id: 'v3', name: 'Vendor C' }
];

export const orders = [
    // Vendor A Orders
    { id: 'ORD001', amount: 120, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Fresh Apple Juice', createdAt: '2023-10-01' },
    { id: 'ORD002', amount: 85, status: 'Pending', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Mango Smoothie', createdAt: '2023-10-02' },
    { id: 'ORD003', amount: 200, status: 'Preparing', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Mixed Fruit Bowl', createdAt: '2023-10-03' },
    { id: 'ORD004', amount: 150, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Orange Juice', createdAt: '2023-10-05' },
    { id: 'ORD005', amount: 90, status: 'Pending', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Banana Shake', createdAt: '2023-10-06' },
    { id: 'ORD006', amount: 300, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Family Pack Juices', createdAt: '2023-10-08' },
    { id: 'ORD007', amount: 110, status: 'Preparing', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Pineapple Juice', createdAt: '2023-10-09' },

    // Vendor B Orders
    { id: 'ORD008', amount: 450, status: 'Delivered', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Super Berry Blast', createdAt: '2023-10-01' },
    { id: 'ORD009', amount: 130, status: 'Pending', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Green Detox', createdAt: '2023-10-02' },
    { id: 'ORD010', amount: 95, status: 'Delivered', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Carrot Juice', createdAt: '2023-10-04' },
    { id: 'ORD011', amount: 220, status: 'Preparing', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Protein Shake', createdAt: '2023-10-05' },
    { id: 'ORD012', amount: 340, status: 'Delivered', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Mega Salad', createdAt: '2023-10-07' },
    { id: 'ORD013', amount: 125, status: 'Delivered', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Mint Lemonade', createdAt: '2023-10-09' },

    // Vendor C Orders
    { id: 'ORD014', amount: 500, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Party Platter', createdAt: '2023-10-01' },
    { id: 'ORD015', amount: 60, status: 'Pending', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Watermelon Juice', createdAt: '2023-10-03' },
    { id: 'ORD016', amount: 180, status: 'Preparing', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Avocado Toast', createdAt: '2023-10-04' },
    { id: 'ORD017', amount: 250, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Grilled Veggies', createdAt: '2023-10-06' },
    { id: 'ORD018', amount: 300, status: 'Pending', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Catering Box', createdAt: '2023-10-08' },
    { id: 'ORD019', amount: 150, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Fruit Tart', createdAt: '2023-10-10' },

    // More Mixed Orders for density
    { id: 'ORD020', amount: 100, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Apple Juice', createdAt: '2023-10-10' },
    { id: 'ORD021', amount: 210, status: 'Preparing', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Veggie Wrap', createdAt: '2023-10-10' },
    { id: 'ORD022', amount: 300, status: 'Pending', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Combo Meal', createdAt: '2023-10-11' },
    { id: 'ORD023', amount: 400, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Super Feast', createdAt: '2023-10-11' },
    { id: 'ORD024', amount: 50, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Water Bottle', createdAt: '2023-10-11' },
    { id: 'ORD025', amount: 120, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Soup', createdAt: '2023-10-12' },
    { id: 'ORD026', amount: 180, status: 'Preparing', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Sandwich', createdAt: '2023-10-12' },
    { id: 'ORD027', amount: 250, status: 'Pending', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Pizza Slice', createdAt: '2023-10-12' },
    { id: 'ORD028', amount: 90, status: 'Delivered', vendorId: 'v1', vendorName: 'Vendor A', productName: 'Coffee', createdAt: '2023-10-13' },
    { id: 'ORD029', amount: 340, status: 'Delivered', vendorId: 'v3', vendorName: 'Vendor C', productName: 'Pasta', createdAt: '2023-10-13' },
    { id: 'ORD030', amount: 110, status: 'Preparing', vendorId: 'v2', vendorName: 'Vendor B', productName: 'Burger', createdAt: '2023-10-13' },
];
