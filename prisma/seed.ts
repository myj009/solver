import { Country, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: "1" },
    update: {
      name: "alice",
      password: bcrypt.hashSync("123456", 10),
    },
    create: {
      id: "1",
      name: "alice",
      email: "alice@gmail.com",
      password: bcrypt.hashSync("123456", 10),
    },
  });
  const bob = await prisma.user.upsert({
    where: { id: "2" },
    update: {
      name: "bob",
      password: bcrypt.hashSync("123456", 10),
    },
    create: {
      id: "2",
      name: "bob",
      email: "bob@yahoo.com",
      password: bcrypt.hashSync("123456", 10),
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo6" },
    update: {},
    create: {
      id: "cm05dt7z6000008jv5l302fo6",
      title: "Software Engineer",
      shortDescription: "Develop software",
      longDescription: "Develop software",
      amount: 100000,
      workMode: "HYBRID",
      country: Country.UNITED_STATES,
      clientId: alice.id,
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo7" },
    update: {},
    create: {
      id: "cm05dt7z6000008jv5l302fo7",
      title: "Software Engineer",
      longDescription: "Develop software",
      shortDescription: "Develop software",
      amount: 100000,
      workMode: "REMOTE",
      country: Country.UNITED_STATES,
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
      longDescription: "Develop software",
      shortDescription: "Develop software",
      amount: 100000,
      workMode: "OFFICE",
      country: Country.UNITED_STATES,
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
