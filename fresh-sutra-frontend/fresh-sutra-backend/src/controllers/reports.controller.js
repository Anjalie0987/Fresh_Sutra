import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

export const generateCustomerMatchReport = async (req, res) => {
    try {
        // Fetch all users with their orders
        const users = await prisma.user.findMany({
            include: {
                orders: true
            }
        });

        // Transform data into required format
        const reportData = users.map(user => {
            const totalOrders = user.orders.length;
            const lifetimeValue = user.orders.reduce((sum, order) => sum + order.amount, 0);

            // Calculate dates
            let firstOrderDate = '';
            let lastOrderDate = '';

            if (totalOrders > 0) {
                const dates = user.orders.map(o => new Date(o.createdAt).getTime());
                firstOrderDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
                lastOrderDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
            }

            // Customer Type Logic
            let customerType = '';
            if (totalOrders === 1) customerType = 'New';
            else if (totalOrders > 1) customerType = 'Existing';

            // Audience Tag Logic
            let audienceTag = '';
            if (totalOrders >= 3) audienceTag = 'Repeat Buyer';
            else if (lifetimeValue >= 2000) audienceTag = 'High Value Customer';
            else if (lastOrderDate) {
                const daysSinceLastOrder = (new Date() - new Date(lastOrderDate)) / (1000 * 60 * 60 * 24);
                if (daysSinceLastOrder > 60) audienceTag = 'Dormant User';
            }

            return {
                "Email": user.email.toLowerCase(),
                "Phone": user.phone ? (user.phone.startsWith('+91') ? user.phone : `+91${user.phone}`) : '',
                "First Name": user.firstName || '',
                "Last Name": user.lastName || '',
                "Country": user.country || 'IN',
                "Zip": user.zip || '',
                "Customer Type": customerType,
                "Total Orders": totalOrders,
                "Lifetime Value": lifetimeValue,
                "First Order Date": firstOrderDate,
                "Last Order Date": lastOrderDate,
                "Store Name": "", // Placeholder
                "City": user.city || '',
                "Preferred Platform": "", // Placeholder
                "Audience Tag": audienceTag
            };
        });

        // Create Workbook and Worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(reportData);

        // Append worksheet to workbook
        xlsx.utils.book_append_sheet(wb, ws, "Customer_Match");

        // Generate filename
        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = `FreshSutra_CustomerMatch_${dateStr}.xlsx`;

        // Write to buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Set Headers for Download
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer
        res.send(buffer);

    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Failed to generate report" });
    }
};
