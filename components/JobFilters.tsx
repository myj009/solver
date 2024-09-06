"use client";

import { useState } from "react";
import { WorkMode, Country } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface JobFilters {
  country?: Country;
  workMode?: WorkMode;
  minAmount?: number;
  maxAmount?: number;
}

interface JobFiltersProps {
  onFilterChange: (filters: JobFilters) => void;
}

const formSchema = z.object({
  country: z.enum(["ALL", ...Object.values(Country)]),
  workMode: z.enum(["ALL", ...Object.values(WorkMode)]),
  minAmount: z.string().optional(),
  maxAmount: z.string().optional(),
});

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "ALL",
      workMode: "ALL",
      minAmount: "",
      maxAmount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFilterChange({
      country:
        values.country === "ALL" ? undefined : (values.country as Country),
      workMode:
        values.workMode === "ALL" ? undefined : (values.workMode as WorkMode),
      minAmount: values.minAmount ? parseInt(values.minAmount) : undefined,
      maxAmount: values.maxAmount ? parseInt(values.maxAmount) : undefined,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={(value) => {
                  form.handleSubmit(onSubmit);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALL">All Countries</SelectItem>
                  {Object.values(Country).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workMode"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Work Mode</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a work mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALL">All Work Modes</SelectItem>
                  {Object.values(WorkMode).map((wm) => (
                    <SelectItem key={wm} value={wm}>
                      {wm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minAmount"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Min Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxAmount"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Max Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Filter</Button>
      </form>
    </Form>
  );
}
