import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const stores = [
    // --- DELHI STORES (30) ---
    { name: "Fresh Sutra - Connaught Place", latitude: 28.6304, longitude: 77.2177 },
    { name: "Fresh Sutra - Khan Market", latitude: 28.6003, longitude: 77.2269 },
    { name: "Fresh Sutra - Hauz Khas Village", latitude: 28.5532, longitude: 77.1944 },
    { name: "Fresh Sutra - Defense Colony", latitude: 28.5732, longitude: 77.2346 },
    { name: "Fresh Sutra - Saket Select City", latitude: 28.5283, longitude: 77.2201 },
    { name: "Fresh Sutra - Vasant Kunj", latitude: 28.5293, longitude: 77.1522 },
    { name: "Fresh Sutra - Greater Kailash 1", latitude: 28.5504, longitude: 77.2407 },
    { name: "Fresh Sutra - Greater Kailash 2", latitude: 28.5268, longitude: 77.2520 },
    { name: "Fresh Sutra - Lajpat Nagar", latitude: 28.5677, longitude: 77.2433 },
    { name: "Fresh Sutra - South Ex", latitude: 28.5683, longitude: 77.2185 },
    { name: "Fresh Sutra - Green Park", latitude: 28.5583, longitude: 77.2072 },
    { name: "Fresh Sutra - Nehru Place", latitude: 28.5494, longitude: 77.2527 },
    { name: "Fresh Sutra - Karol Bagh", latitude: 28.6521, longitude: 77.1892 },
    { name: "Fresh Sutra - Rajouri Garden", latitude: 28.6496, longitude: 77.1197 },
    { name: "Fresh Sutra - Punjabi Bagh", latitude: 28.6692, longitude: 77.1325 },
    { name: "Fresh Sutra - Dwarka Sec 10", latitude: 28.5835, longitude: 77.0583 },
    { name: "Fresh Sutra - Dwarka Sec 21", latitude: 28.5524, longitude: 77.0587 },
    { name: "Fresh Sutra - Janakpuri", latitude: 28.6219, longitude: 77.0878 },
    { name: "Fresh Sutra - Rohini Sec 3", latitude: 28.7073, longitude: 77.1165 },
    { name: "Fresh Sutra - Pitampura", latitude: 28.7032, longitude: 77.1324 },
    { name: "Fresh Sutra - Model Town", latitude: 28.7041, longitude: 77.1925 },
    { name: "Fresh Sutra - Kamla Nagar", latitude: 28.6806, longitude: 77.2057 },
    { name: "Fresh Sutra - Civil Lines", latitude: 28.6775, longitude: 77.2238 },
    { name: "Fresh Sutra - Chandni Chowk", latitude: 28.6506, longitude: 77.2303 },
    { name: "Fresh Sutra - Preet Vihar", latitude: 28.6419, longitude: 77.2954 },
    { name: "Fresh Sutra - Laxmi Nagar", latitude: 28.6366, longitude: 77.2751 },
    { name: "Fresh Sutra - Mayur Vihar", latitude: 28.6015, longitude: 77.2941 },
    { name: "Fresh Sutra - Shahdara", latitude: 28.6734, longitude: 77.2935 },
    { name: "Fresh Sutra - New Friends Colony", latitude: 28.5681, longitude: 77.2725 },
    { name: "Fresh Sutra - Okhla", latitude: 28.5482, longitude: 77.2838 },

    // --- GURGAON STORES (20) ---
    { name: "Fresh Sutra - Cyber Hub", latitude: 28.4952, longitude: 77.0890 },
    { name: "Fresh Sutra - Udyog Vihar", latitude: 28.5020, longitude: 77.0845 },
    { name: "Fresh Sutra - Galleria Market", latitude: 28.4687, longitude: 77.0827 },
    { name: "Fresh Sutra - Sector 29", latitude: 28.4697, longitude: 77.0628 },
    { name: "Fresh Sutra - MG Road", latitude: 28.4795, longitude: 77.0803 },
    { name: "Fresh Sutra - Sohna Road", latitude: 28.4124, longitude: 77.0426 },
    { name: "Fresh Sutra - Golf Course Road", latitude: 28.4595, longitude: 77.0934 },
    { name: "Fresh Sutra - Huda City Centre", latitude: 28.4594, longitude: 77.0726 },
    { name: "Fresh Sutra - Ambience Mall", latitude: 28.5044, longitude: 77.0970 },
    { name: "Fresh Sutra - Sector 14", latitude: 28.4724, longitude: 77.0375 },
    { name: "Fresh Sutra - Sector 56", latitude: 28.4239, longitude: 77.1006 },
    { name: "Fresh Sutra - Nirvana Country", latitude: 28.4190, longitude: 77.0678 },
    { name: "Fresh Sutra - Palam Vihar", latitude: 28.5135, longitude: 77.0326 },
    { name: "Fresh Sutra - Sector 45", latitude: 28.4485, longitude: 77.0652 },
    { name: "Fresh Sutra - DLF Phase 1", latitude: 28.4716, longitude: 77.1085 },
    { name: "Fresh Sutra - DLF Phase 3", latitude: 28.4893, longitude: 77.0984 },
    { name: "Fresh Sutra - Sector 31", latitude: 28.4526, longitude: 77.0518 },
    { name: "Fresh Sutra - Hero Honda Chowk", latitude: 28.4411, longitude: 77.0264 },
    { name: "Fresh Sutra - Manesar", latitude: 28.3541, longitude: 76.9427 },
    { name: "Fresh Sutra - Sector 82", latitude: 28.3978, longitude: 76.9667 }
];



async function seedUsers() {
    console.log("Checking for Admin user...");
    const oldAdminEmail = "admin@freshsutra.com";
    const newAdminEmail = "accordantconsultants@gmail.com";
    const newPassword = await bcrypt.hash("freshsutra88", 10);

    // 1. Check if new admin already exists
    const newAdmin = await prisma.user.findUnique({
        where: { email: newAdminEmail }
    });

    if (newAdmin) {
        console.log("New Admin already exists. Updating password...");
        await prisma.user.update({
            where: { email: newAdminEmail },
            data: { password: newPassword, role: 'ADMIN' }
        });
        console.log("Admin credentials synchronized.");
    } else {
        // 2. Check if old admin exists to migrate
        const oldAdmin = await prisma.user.findUnique({
            where: { email: oldAdminEmail }
        });

        if (oldAdmin) {
            console.log("Migrating Old Admin to New Credentials...");
            await prisma.user.update({
                where: { email: oldAdminEmail },
                data: {
                    email: newAdminEmail,
                    password: newPassword,
                    role: 'ADMIN'
                }
            });
            console.log("Admin migrated successfully.");
        } else {
            // 3. Create fresh if neither exists
            console.log("Creating New Admin User...");
            await prisma.user.create({
                data: {
                    name: "Fresh Sutra Admin",
                    email: newAdminEmail,
                    password: newPassword,
                    role: "ADMIN"
                }
            });
            console.log("New Admin created.");
        }
    }
}

async function main() {
    await seedUsers();

    console.log(`Start seeding ${stores.length} stores...`);

    // Clear existing data (optional, but good for reliable seed)
    // await prisma.store.deleteMany({}); 

    // Using createMany for better performance
    const result = await prisma.store.createMany({
        data: stores,
        skipDuplicates: true, // Crucial to prevent errors if running multiple times
    });

    console.log(`Seeding finished. Added ${result.count} stores.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
