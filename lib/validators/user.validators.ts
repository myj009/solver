import * as z from "zod";
import { Country } from "@prisma/client";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.nativeEnum(Country).optional(),
  address: z.string().optional(),
});

export const educationSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  fromDate: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  toDate: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  description: z.string().min(1, "Description is required"),
  fromDate: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  toDate: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
