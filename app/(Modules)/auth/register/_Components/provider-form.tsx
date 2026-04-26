import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  IdCard,
  Calendar,
  Upload,
  CheckCircle,
  Building2,
  FileCheck,
  Link,
  Image as ImageIcon,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProviderForm = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="border shadow-xl">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-500 to-orange-600 shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white">
              Step 2 of 2
            </Badge>
          </div>
        </div>
        <CardHeader className="text-center border-b pb-6">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-linear-to-r from-amber-500 to-orange-600 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Provider Verification
          </CardTitle>
          <CardDescription>
            Please provide your professional and identification details
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Basic Information
                </h3>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="provideName" className="text-sm font-medium">
                  Service Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="provideName"
                    placeholder="e.g., Barber Salon, Cleaning Pro"
                    className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This name will appear on your public profile
                </p>
              </div>
            </div>

            <Separator />

            {/* Section 2: Identification */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <IdCard className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Identity Verification
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="idNumber" className="text-sm font-medium">
                    ID Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="idNumber"
                      placeholder="e.g., Passport, National ID"
                      className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name (as on ID) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="birthday" className="text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="birthday"
                      type="date"
                      className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="nationality" className="text-sm font-medium">
                    Nationality
                  </Label>
                  <div className="relative">
                    <FileCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nationality"
                      placeholder="e.g., American, British"
                      className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 3: Document Uploads */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Upload className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Document Uploads
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="idImage" className="text-sm font-medium">
                    ID Document <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="idImage"
                      type="file"
                      accept="image/*"
                      className="h-11 bg-background file:mr-2 file:px-3 file:py-1.5 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 file:border-0 hover:file:bg-amber-100 dark:file:bg-amber-950 dark:file:text-amber-300"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload front side of your ID/Passport
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="selfieID" className="text-sm font-medium">
                    Selfie with ID <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="selfieID"
                      type="file"
                      accept="image/*"
                      className="h-11 bg-background file:mr-2 file:px-3 file:py-1.5 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 file:border-0 hover:file:bg-amber-100 dark:file:bg-amber-950 dark:file:text-amber-300"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Take a photo holding your ID next to your face
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 4: Portfolio Images - Improved with Tabs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <ImageIcon className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Portfolio (Max 5 items)
                </h3>
              </div>

              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Images
                  </TabsTrigger>
                  <TabsTrigger value="link" className="gap-2">
                    <Link className="h-4 w-4" />
                    Add Image Links
                  </TabsTrigger>
                </TabsList>

                {/* Upload Files Tab */}
                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors">
                    <Input
                      id="portfolioImages"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <Label
                      htmlFor="portfolioImages"
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-950">
                        <Upload className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        Click to upload images
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP up to 5MB each (Max 5 images)
                      </span>
                    </Label>
                  </div>

                  {/* Image Preview Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="relative group aspect-square rounded-lg border bg-muted/30 overflow-hidden"
                      >
                        <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <Button className="absolute top-1 right-1 p-1 rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </Button>
                        <Badge
                          variant="secondary"
                          className="absolute bottom-1 left-1 text-[10px]"
                        >
                          Pending
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Add Links Tab */}
                <TabsContent value="link" className="space-y-4 mt-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com/image.jpg"
                        className="pl-9 h-10"
                      />
                    </div>
                    <Button variant="outline" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Add up to {5} image URLs (Direct image links only)
                  </p>

                  {/* URL List */}
                  <div className="space-y-2 mt-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg border bg-muted/30"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm truncate">
                            https://example.com/portfolio-image-{i}.jpg
                          </span>
                        </div>
                        <Button className="p-1 hover:bg-muted rounded transition-colors">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <p className="text-xs text-muted-foreground mt-2">
                You can add up to 5 items total (combination of uploads and
                links)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 h-11">
                Back
              </Button>
              <Button className="flex-1 h-11 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                Send Application
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderForm;
