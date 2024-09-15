import { Prisma } from "@prisma/client";

export type JobApplicationWithDeveloper = Prisma.JobApplicationGetPayload<{
  include: {
    developer: {
      select: {
        id: true;
        name: true;
        email: true;
        country: true;
      };
    };
  };
}>;

export type JobWithClient = Prisma.JobGetPayload<{
  include: {
    client: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export type JobWithClientAndApplications = Prisma.JobGetPayload<{
  include: {
    client: {
      select: {
        id: true;
        name: true;
      };
    };
    _count: {
      select: {
        JobApplication: true;
      };
    };
  };
}>;

export type UserWithExperienceAndEducation = Prisma.UserGetPayload<{
  include: {
    UserExperience: true;
    UserEducation: true;
  };
}>;
