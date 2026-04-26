import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Store } from "lucide-react";
import Link from "next/link";

const ProviderCard = ({
  businessName,
  description,
  location,
}: {
  businessName: string;
  description?: string | null;
  location: string | null;
  createdAt: Date;
  userId: string;
  id: string;
}) => {
  return (
    <Link href={"/providers/1"}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.05] border bg-card overflow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-amber-500/10 to-orange-500/10 shrink-0">
              <Store className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {businessName}
              </h3>
              {location && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {location}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        {description && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};

// Grid Component to display multiple cards

export default ProviderCard;
