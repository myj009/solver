"use client";

import { upsertJob } from "@/actions/job/createJob";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, Job, WorkMode } from "@prisma/client";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const countries = Object.entries(Country).map(([label, value]) => ({
  label: label.replace(/_/g, " "),
  value,
}));

const formSchema = z.object({
  title: z.string().min(2).max(100),
  shortDescription: z.string().min(10).max(200),
  longDescription: z.string().min(10),
  workMode: z.nativeEnum(WorkMode),
  amount: z.number().int().positive().optional(),
  country: z.nativeEnum(Country),
});

export function CreateJobForm({
  job,
  onSuccess,
}: {
  job?: Job;
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: job?.title || "",
      shortDescription: job?.shortDescription || "",
      longDescription:
        job?.longDescription ||
        `
**About the Client**
   

**Job Description**
  

**Preferred Qualifications**

`,
      workMode: job?.workMode || WorkMode.REMOTE,
      amount: job?.amount || 0,
      country: job?.country || Country.UNITED_STATES,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await upsertJob(values, job?.id);
      toast.success(
        job ? "Job updated successfully" : "Job created successfully"
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">
        {job ? "Edit Job Posting" : "Create a Job Posting"}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Short Description
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Long Description(In Markdown)
                </FormLabel>
                <FormControl>
                  <div className="flex max-h-96 w-full">
                    <MDEditor
                      className="w-full"
                      minHeight={400}
                      height={400}
                      value={field.value}
                      onChange={(value: string | undefined) =>
                        field.onChange(value || "")
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Work Mode
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(WorkMode).map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Amount (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : job ? "Update Job" : "Create Job"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
