"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import {
  ProfileFormValues,
  profileSchema,
} from "@/lib/validators/user.validators";
import { UserWithExperienceAndEducation } from "@/types/prisma-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UserEducation from "./UserEducation";
import UserExperience from "./UserExperience";
import toast from "react-hot-toast";
import {
  updateUserProfile,
  uploadProfileImage,
} from "@/actions/user/updateUserProfile";

type ProfileFormProps = {
  user: UserWithExperienceAndEducation;
  viewOnly?: boolean;
};

export default function ProfileForm({
  user,
  viewOnly = false,
}: ProfileFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      country: user.country || undefined,
      address: user.address || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const result = await updateUserProfile(data);
      if (result.success) {
        setIsDialogOpen(false);
        router.refresh();
        toast.success("Profile updated successfully");
      } else {
        console.error("Failed to update profile:", result.error);
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const result = await uploadProfileImage(user.id, base64String);

        if (result.success) {
          router.refresh();
        } else {
          console.error("Failed to upload image:", result.error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-x-4">
            <div className="relative w-24 h-24">
              <Image
                src={user.image || "/public/profile.png"}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
              {!viewOnly && (
                <button
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Phone</p>
              <p>{user.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold">Country</p>
              <p>{user.country || "Not provided"}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Address</p>
              <p>{user.address || "Not provided"}</p>
            </div>
          </div>

          <Separator />
          <div className="flex flex-col space-y-1">
            <UserEducation user={user} viewOnly={viewOnly} />
            <UserExperience user={user} viewOnly={viewOnly} />
          </div>

          {!viewOnly && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div className="flex w-full justify-center">
                  <Button className="items-center p-4">Edit Profile</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Country</FormLabel>
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
                              {Object.values(Country).map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country.replace(/_/g, " ")}
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
