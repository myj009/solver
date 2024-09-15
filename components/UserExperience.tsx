import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CalendarDatePicker } from "./CalendarDatePicker";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";
import React, { useState } from "react";
import { addExperience } from "@/actions/user/updateUserProfile";
import {
  ExperienceFormValues,
  experienceSchema,
} from "@/lib/validators/user.validators";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserExperience } from "@prisma/client";
import { updateExperience } from "@/actions/user/updateUserProfile";
import toast from "react-hot-toast";

export default function UserExperienceComponent({
  user,
  viewOnly = false,
}: {
  user: UserWithExperienceAndEducation;
  viewOnly?: boolean;
}) {
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<UserExperience | null>(null);
  const router = useRouter();

  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      companyName: "",
      position: "",
      description: "",
      fromDate: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: undefined,
      },
      toDate: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: undefined,
      },
    },
  });

  const onExperienceSubmit = async (data: ExperienceFormValues) => {
    try {
      let result;
      if (editingExperience) {
        result = await updateExperience(editingExperience.id, data);
      } else {
        result = await addExperience(user.id, data);
      }
      if (result.success) {
        setIsExperienceDialogOpen(false);
        setEditingExperience(null);
        experienceForm.reset();
        router.refresh();
        if (editingExperience) {
          toast.success("Experience updated successfully");
        } else {
          toast.success("Experience added successfully");
        }
      } else {
        if (editingExperience) {
          toast.error("Failed to update experience");
          console.error("Failed to update experience:", result.error);
        } else {
          toast.error("Failed to add experience");
          console.error("Failed to add experience:", result.error);
        }
      }
    } catch (error) {
      if (editingExperience) {
        toast.error("Error updating experience");
      } else {
        toast.error("Error adding experience");
      }
      console.error("Error updating experience:", error);
    }
  };

  const handleEditExperience = (experience: UserExperience) => {
    setEditingExperience(experience);
    experienceForm.reset({
      companyName: experience.companyName,
      position: experience.position,
      description: experience.description,
      fromDate: {
        from: new Date(experience.startDate),
        to: undefined,
      },
      toDate: {
        from: experience.endDate ? new Date(experience.endDate) : undefined,
        to: undefined,
      },
    });
    setIsExperienceDialogOpen(true);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="experience">
        <AccordionTrigger>Work Experience</AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2">
          {user.UserExperience.map((experience) => (
            <div
              key={experience.id}
              className="p-2 pt-1 bg-muted rounded-md border border-muted-foreground"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">
                  {experience.position}
                </h3>
                {!viewOnly && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditExperience(experience)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p>{experience.companyName}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(experience.startDate).toLocaleDateString()} -
                {experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : "Present"}
              </p>
              <p className="text-sm mt-1">{experience.description}</p>
            </div>
          ))}
          {!viewOnly && (
            <Dialog
              open={isExperienceDialogOpen}
              onOpenChange={(open) => {
                setIsExperienceDialogOpen(open);
                if (!open) {
                  setEditingExperience(null);
                  experienceForm.reset();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 p-4 w-fit">
                  <PlusIcon className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingExperience ? "Edit Experience" : "Add Experience"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...experienceForm}>
                  <form
                    onSubmit={experienceForm.handleSubmit(onExperienceSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={experienceForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={experienceForm.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={experienceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={experienceForm.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <CalendarDatePicker
                              date={field.value}
                              onDateSelect={({ from, to }) => {
                                experienceForm.setValue("fromDate", {
                                  from,
                                  to,
                                });
                              }}
                              variant="outline"
                              numberOfMonths={1}
                              className="min-w-[250px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={experienceForm.control}
                      name="toDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <CalendarDatePicker
                              date={field.value}
                              onDateSelect={({ from, to }) => {
                                experienceForm.setValue("toDate", {
                                  from,
                                  to,
                                });
                              }}
                              variant="outline"
                              numberOfMonths={1}
                              className="min-w-[250px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">
                      {editingExperience
                        ? "Update Experience"
                        : "Add Experience"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
