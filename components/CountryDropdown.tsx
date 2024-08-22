"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, lowerCase } from "@/lib/utils";
import countries from "@/data/countries.json";

import { type CountryProps } from "@/lib/types";
import { CommandList } from "cmdk";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface CountryDropdownProps {
  disabled?: boolean;
}

const CountryDropdown = ({ disabled }: CountryDropdownProps) => {
  const methods = useFormContext();
  const [openDropdown, setOpenDropdown] = useState(false);

  const C = countries as CountryProps[];

  return (
    <FormField
      control={methods.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <Popover open={openDropdown}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[300px] justify-between rounded-[6px] border !border-[#27272a] "
                  disabled={disabled}
                  onClick={() => setOpenDropdown(true)}
                >
                  <span>
                    {field.value ? (
                      <div className="flex items-end gap-2">
                        <span>
                          {
                            countries.find(
                              (country) =>
                                lowerCase(country.name) === field.value
                            )?.emoji
                          }
                        </span>
                        <span>
                          {
                            countries.find(
                              (country) =>
                                lowerCase(country.name) === field.value
                            )?.name
                          }
                        </span>
                      </div>
                    ) : (
                      <span>Select Country...</span>
                    )}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] rounded-[6px] border border-[#27272a] p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[300px] w-full">
                      {C &&
                        C.map((country) => (
                          <CommandItem
                            key={country.id}
                            value={lowerCase(country.name)}
                            onSelect={(currentValue) => {
                              const cValue =
                                currentValue === lowerCase(country.name)
                                  ? currentValue
                                  : "";
                              methods.setValue("country", cValue);
                              setOpenDropdown(false);
                            }}
                            className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                          >
                            <div className="flex items-end gap-2">
                              <span>{country.emoji}</span>
                              <span className="">{country.name}</span>
                            </div>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === lowerCase(country.name)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CountryDropdown;
