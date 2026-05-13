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
import { Eye, SquarePen, Clock } from "lucide-react";
import Link from "next/link";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import { cookies } from "next/headers";
import getDayOfWeek from "./_utils/getDayOfWeek";
import numberToTime from "./_utils/getStartAndEndTime";
import Availability from "../../../(shared)/__entities/availability";

const AvailableTable = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`http://localhost:5000/api/availability`, {
    headers: {
      Cookie: allCookies,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    return <> something went wrong</>;
  }
  const availability = (await response.json()) as Availability[];

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
            {availability.length} Total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-50 font-semibold">Day</TableHead>
                <TableHead className="font-semibold">Start Time</TableHead>
                <TableHead className="font-semibold">End Time</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {availability.map((a, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </span>
                      {getDayOfWeek(a.dayOfWeek)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </span>
                      {transformingTheDateToATextString(
                        numberToTime(a.startTime),
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </span>
                      {transformingTheDateToATextString(
                        numberToTime(a.endTime),
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {transformingTheDateToATextString(a.createdAt)}{" "}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/admin-dashboard/users/user/${a.id}`}>
                        {" "}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/admin-dashboard/users/users-update-form?id=${a.id}`}
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

export default AvailableTable;
