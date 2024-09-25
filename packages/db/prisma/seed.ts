import { Country, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../src";

async function main() {
  const alice = await prisma.user.upsert({
    where: { id: "1" },
    update: {
      name: "alice",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "1234567890",
    },
    create: {
      id: "1",
      name: "alice",
      email: "alice@test.com",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "1234567890",
    },
  });
  const bob = await prisma.user.upsert({
    where: { id: "2" },
    update: {
      name: "bob",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "9876543210",
    },
    create: {
      id: "2",
      name: "bob",
      email: "bob@test.com",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "9876543210",
    },
  });
  const charlie = await prisma.user.upsert({
    where: { id: "3" },
    update: {
      name: "charlie",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "9898989898",
    },
    create: {
      id: "3",
      name: "charlie",
      email: "charlie@test.com",
      password: bcrypt.hashSync("123456", 10),
      country: Country.UNITED_STATES,
      address: "123 Main St",
      phone: "9898989898",
    },
  });

  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo6" },
    update: {
      title: "Software Engineer",
      shortDescription: "Develop software for our company",
      longDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "HYBRID",
      country: Country.UNITED_STATES,
      clientId: alice.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo6",
      title: "Software Engineer",
      shortDescription: "Develop software for our company",
      longDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "HYBRID",
      country: Country.UNITED_STATES,
      clientId: alice.id,
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo7" },
    update: {
      title: "Software Engineer",
      longDescription: "Develop software",
      shortDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "REMOTE",
      country: Country.UNITED_STATES,
      clientId: alice.id,
      isAccepted: true,
      developerId: bob.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo7",
      title: "Software Engineer",
      longDescription: "Develop software",
      shortDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "REMOTE",
      country: Country.UNITED_STATES,
      clientId: alice.id,
      isAccepted: true,
      developerId: bob.id,
      acceptedAt: new Date(),
    },
  });
  await prisma.job.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo8" },
    update: {
      title: "Software Engineer",
      longDescription: "Develop software",
      shortDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "OFFICE",
      country: Country.UNITED_STATES,
      clientId: alice.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo8",
      title: "Software Engineer",
      longDescription: "Develop software",
      shortDescription:
        "Develop software for our company. We are a startup company. We are looking for a software engineer to develop software for our company.",
      amount: 100000,
      workMode: "OFFICE",
      country: Country.UNITED_STATES,
      clientId: alice.id,
    },
  });

  await prisma.userEducation.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo9" },
    update: {
      userId: charlie.id,
      fieldOfStudy: "Computer Science",
      institutionName: "MIT",
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo9",
      userId: charlie.id,
      fieldOfStudy: "Computer Science",
      institutionName: "MIT",
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  await prisma.userEducation.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo10" },
    update: {
      userId: bob.id,
      fieldOfStudy: "Computer Science",
      institutionName: "MIT",
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo10",
      userId: bob.id,
      fieldOfStudy: "Computer Science",
      institutionName: "MIT",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  await prisma.userExperience.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo11" },
    update: {
      userId: charlie.id,
      companyName: "Google",
      position: "Software Engineer",
      description: "Develop software",
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo11",
      userId: charlie.id,
      companyName: "Google",
      position: "Software Engineer",
      description: "Develop software",
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  await prisma.userExperience.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo12" },
    update: {
      userId: bob.id,
      companyName: "Google",
      position: "Software Engineer",
      description: "Develop software",
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo12",
      userId: bob.id,
      companyName: "Google",
      position: "Software Engineer",
      description: "Develop software",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  await prisma.jobApplication.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo13" },
    update: {
      jobId: "cm05dt7z6000008jv5l302fo6",
      developerId: bob.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo13",
      jobId: "cm05dt7z6000008jv5l302fo6",
      developerId: bob.id,
    },
  });
  await prisma.jobApplication.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo14" },
    update: {
      jobId: "cm05dt7z6000008jv5l302fo6",
      developerId: charlie.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo14",
      jobId: "cm05dt7z6000008jv5l302fo6",
      developerId: charlie.id,
    },
  });
  await prisma.jobApplication.upsert({
    where: { id: "cm05dt7z6000008jv5l302fo15" },
    update: {
      jobId: "cm05dt7z6000008jv5l302fo7",
      developerId: bob.id,
    },
    create: {
      id: "cm05dt7z6000008jv5l302fo15",
      jobId: "cm05dt7z6000008jv5l302fo7",
      developerId: bob.id,
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
