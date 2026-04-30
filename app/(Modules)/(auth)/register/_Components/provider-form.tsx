/* eslint-disable @next/next/no-img-element */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import {
  User,
  IdCard,
  Upload,
  CheckCircle,
  Building2,
  X,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

import ValidationInput from "@/components/inputs/ValidationInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";
import { useRegister } from "../../_hooks/useRegister";
import { useRequestProvider } from "../../_hooks/useRequestProvider";
import {
  providerRequestSchema,
  TProviderRequest,
} from "../../_dto/provider-request";

const SectionHeader = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40">
      <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
    </div>
    <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
      {label}
    </span>
    <div className="flex-1 h-px bg-amber-100 dark:bg-amber-900/40" />
  </div>
);

const ProviderForm = () => {
  const router = useRouter();
  const { mutate: handleRegister } = useRegister();
  const { mutate: handleRequest, isPending } = useRequestProvider();

  // State for files
  const [idImageFile, setIdImageFile] = useState<File | null>(null);
  const [selfieIDFile, setSelfieIDFile] = useState<File | null>(null);
  const [idImagePreview, setIdImagePreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([]);

  const form = useForm<TProviderRequest>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(providerRequestSchema as any),
    mode: "onChange",
    defaultValues: {
      birthday: new Date(),
      provideName: "",
      IDNumber: "",
      fullName: "",
      nationality: "",
      location: "",
      selfieIDImage: undefined,
      IDImage: undefined,
      Portfolio: [],
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "id" | "selfie",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "id") {
        setIdImageFile(file);
        setIdImagePreview(reader.result as string);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setValue("IDImage", file as any);
      } else {
        setSelfieIDFile(file);
        setSelfiePreview(reader.result as string);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setValue("selfieIDImage", file as any);
      }
    };
    reader.readAsDataURL(file);
  };

  const removePortfolioFile = (index: number) => {
    setPortfolioFiles((prev) => prev.filter((_, i) => i !== index));
    setPortfolioPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Filter valid image files
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 5MB`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      return true;
    });

    if (portfolioFiles.length + validFiles.length > 5) {
      toast.error("Maximum 5 portfolio items allowed");
      return;
    }

    if (validFiles.length > 0) {
      // Update portfolio files
      setPortfolioFiles([...portfolioFiles, ...validFiles]);

      // Create previews for new files
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPortfolioPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });

      // Update form value
      const updatedPortfolio = [...portfolioFiles, ...validFiles];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue("Portfolio", updatedPortfolio as any);
    }
  };

  const handleSubmit = async (data: TProviderRequest) => {
    // Validate required files
    if (!idImageFile) {
      toast.error("Please upload your ID document");
      return;
    }
    if (!selfieIDFile) {
      toast.error("Please upload your selfie with ID");
      return;
    }

    // Check file sizes
    if (idImageFile.size === 0) {
      toast.error("ID document file is empty");
      return;
    }
    if (selfieIDFile.size === 0) {
      toast.error("Selfie with ID file is empty");
      return;
    }
    if (portfolioFiles.length === 0) {
      toast.error("Please upload at least one portfolio image");
      return;
    }

    // Add files to data object
    const submitData = {
      ...data,
      IDImage: idImageFile,
      selfieIDImage: selfieIDFile,
      Portfolio: portfolioFiles,
    };

    // Handle registration if needed
    const savedData = localStorage.getItem("registerFormData");
    if (savedData) {
      const { username, email, password } = JSON.parse(savedData);
      handleRegister(
        { password, username, email },
        {
          onSuccess: () => {
            toast.success("Registered successfully!");
            localStorage.removeItem("registerFormData");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleRequest(submitData as any, {
              onSuccess: () => {
                toast.success("Provider application submitted!");
                setTimeout(() => {
                  router.push("/");
                  router.refresh();
                }, 500);
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError: (error: any) => {
                toast.error(getErrorMessage(error));
              },
            });
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            toast.error(getErrorMessage(error));
          },
        },
      );
    } else {
      // Direct submission without registration
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleRequest(submitData as any, {
        onSuccess: () => {
          toast.success("Provider application submitted!");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 500);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast.error(getErrorMessage(error));
        },
      });
    }
  };

  return (
    <div className="min-h-screen b dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to register
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-8 rounded-full bg-amber-200 dark:bg-amber-800" />
            <div className="h-2 w-16 rounded-full bg-amber-500 dark:bg-amber-500" />
          </div>
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            Step 2 of 2
          </span>
        </div>

        <Card className="border-0 shadow-2xl shadow-amber-100/60 dark:shadow-black/40 rounded-2xl overflow-hidden ">
          <div className="h-2 w-full bg-linear-to-r from-amber-400 via-orange-400 to-amber-500" />

          <CardHeader className="px-8 pt-8 pb-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200 dark:shadow-amber-900/50">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight ">
                  Provider Verification
                </h1>
                <p className="mt-1 text-sm text-muted-foreground dark:text-zinc-400">
                  Provide your professional and identification details to get
                  verified.
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  Secure
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(handleSubmit, (errors) => {
                  console.error("Form validation failed:", errors);
                  const firstError = Object.values(errors)[0];
                  if (firstError) {
                    toast.error(
                      firstError.message || "Please fill all required fields",
                    );
                  }
                })}
              >
                {/* Section 1: Basic Info */}
                <div>
                  <SectionHeader icon={User} label="Basic Information" />
                  <ValidationInput<TProviderRequest>
                    fieldTitle="Provider Name"
                    nameInSchema="provideName"
                    placeholder="e.g. Shear Excellence Salon"
                    className="h-11   "
                  />
                </div>

                <Separator className="opacity-50 dark:bg-zinc-800" />

                {/* Section 2: Identity */}
                <div>
                  <SectionHeader icon={IdCard} label="Identity Verification" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <ValidationInput<TProviderRequest>
                      fieldTitle="ID Number"
                      nameInSchema="IDNumber"
                      placeholder="e.g. 20186454"
                      className="h-11 "
                    />
                    <ValidationInput<TProviderRequest>
                      fieldTitle="Full Name (as on ID)"
                      nameInSchema="fullName"
                      placeholder="e.g. John Hasan Doe"
                      className="h-11 "
                    />
                    <ValidationInput<TProviderRequest>
                      fieldTitle="Date of Birth"
                      nameInSchema="birthday"
                      type="date"
                      className="h-11 "
                    />
                    <ValidationInput<TProviderRequest>
                      fieldTitle="Nationality"
                      nameInSchema="nationality"
                      placeholder="e.g. Palestinian"
                      className="h-11 "
                    />
                  </div>
                  <div className="mt-4">
                    <ValidationInput<TProviderRequest>
                      fieldTitle="Location"
                      nameInSchema="location"
                      placeholder="e.g. Palestine - Gaza"
                      className="h-11 "
                    />
                  </div>
                </div>

                <Separator className="opacity-50 dark:bg-zinc-800" />

                {/* Section 3: Document Uploads */}
                <div>
                  <SectionHeader icon={Upload} label="Document Uploads" />
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* ID Document Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium dark:text-zinc-300">
                        ID Document <span className="text-amber-500">*</span>
                      </Label>
                      <label className="flex flex-col items-center gap-2 cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 dark:bg-zinc-800/50 px-4 py-6 text-center transition-all hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                        {idImagePreview ? (
                          <img
                            src={idImagePreview}
                            alt="ID"
                            className="h-32 w-full object-contain"
                          />
                        ) : (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                              <Upload className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <span className="text-sm font-medium dark:text-zinc-300">
                              Click to upload
                            </span>
                            <span className="text-xs text-muted-foreground dark:text-zinc-500">
                              Front side of ID · Max 5MB
                            </span>
                          </>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "id")}
                        />
                      </label>
                    </div>

                    {/* Selfie with ID Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium dark:text-zinc-300">
                        Selfie with ID <span className="text-amber-500">*</span>
                      </Label>
                      <label className="flex flex-col items-center gap-2 cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 dark:bg-zinc-800/50 px-4 py-6 text-center transition-all hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10">
                        {selfiePreview ? (
                          <img
                            src={selfiePreview}
                            alt="Selfie"
                            className="h-32 w-full object-contain"
                          />
                        ) : (
                          <>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                              <Upload className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <span className="text-sm font-medium dark:text-zinc-300">
                              Click to upload
                            </span>
                            <span className="text-xs text-muted-foreground dark:text-zinc-500">
                              Hold ID next to face · Max 5MB
                            </span>
                          </>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "selfie")}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <Separator className="opacity-50 dark:bg-zinc-800" />

                {/* Section 4: Portfolio */}
                <div>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="w-full rounded-xl bg-muted/50 dark:bg-zinc-800 p-1 h-auto">
                      <TabsTrigger
                        value="upload"
                        className="flex-1 gap-2 rounded-lg py-2  dark:data-[state=active]:text-white"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload Images
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-4 space-y-4">
                      {portfolioFiles.length < 5 && (
                        <label className="flex flex-col items-center gap-3 cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 dark:bg-zinc-800/50 px-6 py-8 text-center transition-all hover:border-amber-400 dark:hover:border-amber-500">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                            <Upload className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium dark:text-zinc-300">
                              Click to upload images
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground dark:text-zinc-500">
                              PNG, JPG, WEBP · Max 5MB each (Max 5 images)
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePortfolioUpload}
                          />
                        </label>
                      )}

                      {portfolioPreviews.length > 0 && (
                        <div className="grid grid-cols-5 gap-2">
                          {portfolioPreviews.map((preview, idx) => (
                            <div
                              key={idx}
                              className="group relative aspect-square rounded-xl border bg-muted/30 dark:bg-zinc-800 overflow-hidden"
                            >
                              <img
                                src={preview}
                                alt={`Portfolio ${idx + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <Button
                                type="button"
                                onClick={() => removePortfolioFile(idx)}
                                className="absolute inset-0 flex items-center justify-center rounded-xl bg-red-500/80 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <X className="h-4 w-4 text-white" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 h-12 rounded-xl dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 h-12 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg shadow-amber-200 dark:shadow-amber-900/50 hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Application
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground dark:text-zinc-500">
          Your information is encrypted and only used for verification purposes.
        </p>
      </div>
    </div>
  );
};

export default ProviderForm;
