import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: "cm00jpw8c000008leg64ucaan" },
    update: {},
    create: {
      id: "cm00jpw8c000008leg64ucaan",
      name: "alice",
      email: "alice@gmail.com",
    },
  });
  const bob = await prisma.user.upsert({
    where: { id: "cm00jtdvm000108leg7lr6eo2" },
    update: {},
    create: {
      id: "cm00jtdvm000108leg7lr6eo2",
      name: "bob",
      email: "bob@yahoo.com",
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
