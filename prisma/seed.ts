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
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo6" },
    update: {},
    create: {
      id: "cm05dt7z6000008jv5l302fo6",
      title: "Software Engineer",
      description: "Develop software",
      amount: 100000,
      workMode: "HYBRID",
      location: "USA",
      clientId: alice.id,
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo7" },
    update: {},
    create: {
      id: "cm05dt7z6000008jv5l302fo7",
      title: "Software Engineer",
      description: "Develop software",
      amount: 100000,
      workMode: "REMOTE",
      location: "USA",
      clientId: bob.id,
      isAccepted: true,
      developerId: alice.id,
      acceptedAt: new Date(),
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo8" },
    update: {},
    create: {
      id: "cm05dt7z6000008jv5l302fo8",
      title: "Software Engineer",
      description: "Develop software",
      amount: 100000,
      workMode: "OFFICE",
      location: "USA",
      clientId: bob.id,
    },
  });
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
