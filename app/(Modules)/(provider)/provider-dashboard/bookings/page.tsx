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
import {
  Eye,
  SquarePen,
  Clock,
  Calendar,
  FingerprintPattern,
} from "lucide-react";
import Link from "next/link";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import Bookings from "@/app/(Modules)/(shared)/__entities/booking";

const BookingsTable = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(
    "http://localhost:5000/api/bookings/current-provider",
    {
      headers: {
        Cookie: allCookies,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  );
  const bookings = (await response.json()) as Bookings[];
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
            <h2 className="text-lg font-semibold text-foreground">Bookings</h2>
            <p className="text-sm text-muted-foreground">Bookings table</p>
          </div>
          <Badge variant="outline" className="gap-1">
            {bookings.length} Total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-50 font-semibold">ID</TableHead>
                <TableHead className="w-50 font-semibold">User ID</TableHead>
                <TableHead className="font-semibold">Service ID</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Start Time</TableHead>
                <TableHead className="font-semibold">Enf Time</TableHead>
                <TableHead className="font-semibold">Is Deleted</TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    <span className="text-muted-foreground italic">
                      {booking.id}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.userId} </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FingerprintPattern className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-xs">
                        {booking.serviceId}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {transformingTheDateToATextString(booking.date)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span>
                      {transformingTheDateToATextString(booking.startTime)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>
                      {transformingTheDateToATextString(booking.endTime)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{booking.deletedAt ? "true" : "false"}</span>
                  </TableCell>

                  <TableCell>
                    <span>
                      {transformingTheDateToATextString(booking.endTime)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/services/${booking.id}/booking`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/admin-dashboard/users/users-update-form?id`}
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

export default BookingsTable;
