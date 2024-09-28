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

export type JobWithDeveloperEmail = Prisma.JobGetPayload<{
  include: {
    developer: {
      select: {
        email: true;
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

export type UserMin = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    image: true;
  };
}>;

export type ChannelWithUsers = Prisma.ChannelGetPayload<{
  include: {
    UserChannels: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            email: true;
            image: true;
          };
        };
      };
    };
  };
}>;
