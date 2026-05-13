import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, SquarePen, Clock, Calendar, Podcast } from "lucide-react";
import Link from "next/link";
import Provider from "@/app/(Modules)/(public)/providers/entities/provider";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";

const ProvidersTablePage = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch("http://localhost:5000/api/provider-profile", {
    headers: {
      Cookie: allCookies,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const providers = (await response.json()) as Provider[];
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend failed with status ${response.status}:`, errorText);
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Users</h2>
            <p className="text-sm text-muted-foreground">Users table</p>
          </div>
          <Badge variant="outline" className="gap-1">
            {providers.length} Total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="w-50 font-semibold">
                  Business name
                </TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {providers.map((provider, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">{provider.id}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{provider.businessName} </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Podcast className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-xs">
                        {provider.description ?? "Not provided"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {provider.location ?? "Not provided"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {transformingTheDateToATextString(provider.createdAt)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`providers/${provider.id}`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`providers/${provider.id}/update`}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/50"
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProvidersTablePage;
