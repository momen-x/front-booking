"use client";
//ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tag,
  Clock,
  DollarSign,
  ImageIcon,
  Plus,
  Sparkles,
} from "lucide-react";
//validations


const AddOrUpdateServiceForm = ({goal,description}: {goal:"Add New Service"|"Update Service Data", description:string}) => {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card className="border shadow-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-linear-to-br from-amber-500/10 to-orange-500/10">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                {goal}
              </CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <form className="space-y-5">
            {/* Service Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Service Name
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="name"
                  placeholder="e.g., Premium Haircut, Beard Styling"
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Choose a clear and descriptive name for your service
              </p>
            </div>

            {/* Duration & Price - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Duration */}
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Duration (minutes)
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  Price ($)
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Service Images */}
            <div className="space-y-2">
              <Label
                htmlFor="images"
                className="text-sm font-medium flex items-center gap-1"
              >
                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Service Images
              </Label>

              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Label
                  htmlFor="images"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-950">
                    <ImageIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Click to upload images
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP up to 5MB (Max 5 images)
                  </span>
                </Label>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1 h-11">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrUpdateServiceForm;
