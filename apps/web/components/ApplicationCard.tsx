import { cn } from "@/lib/utils";
import { JobApplication } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ApplicationCard({
  application,
  className,
}: {
  application: JobApplication;
  className?: string;
}) {
  return (
    <Card key={application.id} className={cn(className, "hover:shadow-lg")}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-4">Content</CardContent>
    </Card>
  );
}
