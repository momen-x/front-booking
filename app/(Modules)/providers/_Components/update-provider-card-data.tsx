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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BriefcaseBusiness,
  FileText,
  MapPin,
  AlertCircle,
  Save,
  Building2,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const UpdateProviderData = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Card className="border shadow-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950">
              <Building2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                Update Provider Data
              </CardTitle>
              <CardDescription>
                Modify your business information below
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <form className="space-y-5">
            {/* Business Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="businessName"
                className="text-sm font-medium flex items-center gap-1"
              >
                <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground" />
                Business Name
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  (requires admin approval)
                </span>
              </Label>
              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="businessName"
                  placeholder="e.g., Elite Barber Shop"
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                <p className="text-xs text-muted-foreground">
                  Changing your business name requires admin approval
                </p>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium flex items-center gap-1"
              >
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Description
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="description"
                  placeholder="Describe your services..."
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                />
              </div>
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-sm font-medium flex items-center gap-1"
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
                <Input
                  id="location"
                  placeholder="e.g., Gaza - Al Nasr Street"
                  className="pl-9 h-10 bg-muted/50 border-border/30 focus:border-primary focus:bg-background transition-colors"
                />
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/30 px-3 py-3">
                <Checkbox
                  id="active"
                  className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="active"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  active provider
                </Label>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Update Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium gap-2"
            >
              <Save className="h-4 w-4" />
              Update Information
            </Button>

            {/* Info Alert */}
            <Alert className="bg-muted/50 border-muted">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-xs text-muted-foreground">
                Changes may take up to 24 hours to be reviewed and approved by
                our team.
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProviderData;
