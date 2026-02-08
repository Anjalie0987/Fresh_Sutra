import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
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
