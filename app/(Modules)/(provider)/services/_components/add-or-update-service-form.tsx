/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tag, Clock, DollarSign, ImageIcon, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/inputs/ValidationInput";
import { serviceSchema, TService } from "../_dto/add-service";
import { updateServiceSchema, TUpdateService } from "../_dto/update-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateService } from "../_hooks/useCreateService";
import { useUpdateService } from "../_hooks/useUpdateService";
import { TServiceProps } from "../_types/service-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";

const ServiceForm = ({
  goal,
  id,
  service,
  description,
  providerId,
}: TServiceProps) => {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    service?.images || [],
  );
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const isUpdate = goal === "update";

  const form = useForm<TUpdateService | TService>({
    resolver: zodResolver(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isUpdate ? (updateServiceSchema as any) : (serviceSchema as any),
    ),
    mode: "onChange",
    defaultValues: isUpdate
      ? {
          providerId,
          name: service.name,
          duration: service.duration,
          price: service.price,
          images: [],
        }
      : {
          providerId,
          name: "",
          duration: 0,
          price: 0,
          images: [],
        },
  });

  const { mutate: handleCreate, isPending: isCreating } = useCreateService();
  const { mutate: handleUpdate, isPending: isUpdating } = useUpdateService();
  const isPending = isCreating || isUpdating;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total =
      (isUpdate
        ? imageFiles.length + existingImages.length - imagesToRemove.length
        : imageFiles.length) + files.length;
    if (total > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }
    setImageFiles([...imageFiles, ...files]);
  };

  const removeNewImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageUrl: string) => {
    setImagesToRemove([...imagesToRemove, imageUrl]);
    setExistingImages(existingImages.filter((img) => img !== imageUrl));
  };

  const onSubmit = (data: TUpdateService | TService) => {
    if (isUpdate) {
      const updateData: TUpdateService = {
        ...data,
        duration: Number(data.duration),
        price: Number(data.price),
        imagesToRemove: imagesToRemove,
        newImages: imageFiles,
      };
      handleUpdate(
        { id: id!, data: updateData },
        {
          onSuccess: () => {
            toast.success("Service updated successfully!");
            setTimeout(() => {
              router.push("/services");
              router.refresh();
            }, 500);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => toast.error(getErrorMessage(error)),
        },
      );
    } else {
     
      const createData: TService = {
        ...(data as TService),
        images: imageFiles,
      };
      handleCreate(createData, {
        onSuccess: () => {
          toast.success("Service added successfully!");
          setTimeout(() => {
            form.reset();
            setImageFiles([]);
            router.refresh();
          }, 500);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => toast.error(getErrorMessage(error)),
      });
    }
  };

  return (
    <Card className="w-full max-w-lg border border-border/40">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          {isUpdate ? "Update Service" : "Add New Service"}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <ValidationInput<TService>
              fieldTitle="Provider ID"
              nameInSchema="providerId"
              className="bg-muted/40 text-muted-foreground cursor-not-allowed"
              disabled
              value={providerId}
            />

            <div className="relative">
              <Tag className="absolute left-3 top-9 h-4 w-4 text-muted-foreground/60 z-10" />
              <ValidationInput<TService>
                fieldTitle="Service Name"
                nameInSchema="name"
                placeholder="e.g. Haircut, Massage..."
                className="pl-9"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Clock className="absolute left-3 top-9 h-4 w-4 text-muted-foreground/60 z-10" />
                <ValidationInput<TService>
                  fieldTitle="Duration (min)"
                  nameInSchema="duration"
                  placeholder="60"
                  type="number"
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-9 h-4 w-4 text-muted-foreground/60 z-10" />
                <ValidationInput<TService>
                  fieldTitle="Price ($)"
                  nameInSchema="price"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className="pl-9"
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Images <span className="text-muted-foreground">(max 3)</span>
              </label>

              {/* Existing Images (Update Mode) */}
              {isUpdate && existingImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Service ${idx + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg w-full h-20 object-cover"
                      />
                      <Button
                        onClick={() => removeExistingImage(img)}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Images Preview */}
              {imageFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {imageFiles.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        className="rounded-lg w-full h-20 object-cover"
                      />
                      <Button
                        onClick={() => removeNewImage(idx)}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload Input */}
              {imageFiles.length +
                (isUpdate ? existingImages.length - imagesToRemove.length : 0) <
                3 && (
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="pl-9 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:px-4 file:py-1.5 file:text-sm file:font-medium file:rounded-md file:border-0 file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 dark:file:bg-amber-950 dark:file:text-amber-300"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11"
              disabled={isPending}
              variant={"outline"}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {isUpdate ? "Saving..." : "Adding..."}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isUpdate ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  {isUpdate ? "Save Changes" : "Add Service"}
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
