import React, { useState } from "react";
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
import {
  EducationFormValues,
  educationSchema,
} from "@/lib/validators/user.validators";
import {
  addEducation,
  updateEducation,
} from "@/actions/user/updateUserProfile";
import { useRouter } from "next/navigation";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";
import { UserEducation } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function UserEducationComponent({
  user,
  viewOnly = false,
}: {
  user: UserWithExperienceAndEducation;
  viewOnly?: boolean;
}) {
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] =
    useState<UserEducation | null>(null);
  const router = useRouter();

  const educationForm = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institutionName: "",
      fieldOfStudy: "",
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

  const onEducationSubmit = async (data: EducationFormValues) => {
    try {
      let result;
      if (editingEducation) {
        result = await updateEducation(editingEducation.id, data);
      } else {
        result = await addEducation(user.id, data);
      }
      if (result.success) {
        setIsEducationDialogOpen(false);
        setEditingEducation(null);
        educationForm.reset();
        router.refresh();
        if (editingEducation) {
          toast.success("Education updated successfully");
        } else {
          toast.success("Education added successfully");
        }
      } else {
        if (editingEducation) {
          toast.error("Failed to update education");
          console.error("Failed to update education:", result.error);
        } else {
          toast.error("Failed to add education");
          console.error("Failed to add education:", result.error);
        }
      }
    } catch (error) {
      if (editingEducation) {
        toast.error("Error updating education");
      } else {
        toast.error("Error adding education");
      }
      console.error("Error adding education:", error);
    }
  };
  const handleEditEducation = (education: UserEducation) => {
    setEditingEducation(education);
    educationForm.reset({
      institutionName: education.institutionName,
      fieldOfStudy: education.fieldOfStudy,
      fromDate: {
        from: new Date(education.startDate),
        to: undefined,
      },
      toDate: {
        from: education.endDate ? new Date(education.endDate) : undefined,
        to: undefined,
      },
    });
    setIsEducationDialogOpen(true);
  };

  return (
    <Accordion
      type="single"
      defaultValue="education"
      collapsible
      className="w-full"
    >
      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2">
          {user.UserEducation.map((education) => (
            <div
              key={education.id}
              className="p-2 pt-1 bg-card rounded-md border border-muted-foreground"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">
                  {education.institutionName}
                </h3>
                {!viewOnly && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEducation(education)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p>{education.fieldOfStudy}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(education.startDate).getFullYear()} -
                {education.endDate
                  ? new Date(education.endDate).getFullYear()
                  : "Present"}
              </p>
            </div>
          ))}
          {!viewOnly && (
            <Dialog
              open={isEducationDialogOpen}
              onOpenChange={(open) => {
                setIsEducationDialogOpen(open);
                if (!open) {
                  setEditingEducation(null);
                  educationForm.reset();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 p-4 w-fit">
                  <PlusIcon className="w-4 h-4 mr-2" /> Add Education
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingEducation ? "Edit Education" : "Add Education"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...educationForm}>
                  <form
                    onSubmit={educationForm.handleSubmit(onEducationSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={educationForm.control}
                      name="institutionName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={educationForm.control}
                      name="fieldOfStudy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={educationForm.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <CalendarDatePicker
                              date={field.value}
                              onDateSelect={({ from, to }) => {
                                educationForm.setValue("fromDate", {
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
                      control={educationForm.control}
                      name="toDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <CalendarDatePicker
                              date={field.value}
                              onDateSelect={({ from, to }) => {
                                educationForm.setValue("fromDate", {
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
                      {editingEducation ? "Update Education" : "Add Education"}
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
