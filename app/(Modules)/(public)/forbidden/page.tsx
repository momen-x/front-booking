// app/forbidden/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Home, Lock, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Access Forbidden | 403",
  description: "You don't have permission to access this page.",
  robots: "noindex, nofollow",
};

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Main Error Card */}
        <Card className="border-border bg-card shadow-lg overflow-hidden">
          <div className="relative h-2 bg-linear-to-r from-red-500 to-amber-500" />

          <CardContent className="p-6 md:p-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-950/30 rounded-full mb-6">
              <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Code */}
            <div className="mb-4">
              <h1 className="text-7xl md:text-8xl font-bold text-foreground mb-2">
                403
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="text-sm uppercase tracking-wider">
                  Access Forbidden
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3 mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                You don&apos;t have permission to view this page
              </h2>
              <p className="text-muted-foreground">
                Sorry, you don&apos;t have the required permissions to access
                this resource. Please contact your administrator if you believe
                this is a mistake.
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                    What could have happened?
                  </p>
                  <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                    <li>
                      • Your account role doesn&lsquo;t have access to this area
                    </li>
                    <li>
                      • You might need to log in with different credentials
                    </li>
                    <li>• Your session may have expired or been revoked</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/profile">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          If you think this is an error, please contact support at{" "}
          <a
            href="mailto:support@yourapp.com"
            className="text-primary hover:underline"
          >
            support@yourapp.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
