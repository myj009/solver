"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { addJob } from "@/actions/job/addJob";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import countries from "@/data/countries.json";

import { type CountryProps } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CountryDropdown from "./CountryDropdown";

enum WorkMode {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  OFFICE = "OFFICE",
}

export const FormSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  workMode: z.nativeEnum(WorkMode),
  amount: z.coerce.number().min(1),
  country: z.string(),
});

export default function AddJobForm() {
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
      country: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addJob(data);
  }

  const C = countries as CountryProps[];
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={methods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="workMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Mode</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Work Mode" />
                  </SelectTrigger>
                  <SelectContent ref={field.ref}>
                    <SelectItem value={WorkMode.REMOTE.toString()}>
                      Remote
                    </SelectItem>
                    <SelectItem value={WorkMode.HYBRID.toString()}>
                      Hybrid
                    </SelectItem>
                    <SelectItem value={WorkMode.OFFICE.toString()}>
                      Office
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CountryDropdown disabled={false} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
