import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function ProviderProfileNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Provider Profile Not Found</h2>
          <p className="text-muted-foreground text-center mb-6">
            The provider profile you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/provider-profiles">
            <Button>Back to Provider Profiles</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}