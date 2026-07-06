import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Fetching users without a mobile number...");
    const users = await prisma.user.findMany({
        where: { mobileNumber: null }
    });
    
    console.log(`Found ${users.length} users to update.`);
    for (let i = 0; i < users.length; i++) {
        const dummyMobile = '999999' + String(i).padStart(4, '0');
        await prisma.user.update({
            where: { id: users[i].id },
            data: { mobileNumber: dummyMobile }
        });
        console.log(`Updated user ${users[i].email} with mobile ${dummyMobile}`);
    }
    console.log("Done updating users.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
