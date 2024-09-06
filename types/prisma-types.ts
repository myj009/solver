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
