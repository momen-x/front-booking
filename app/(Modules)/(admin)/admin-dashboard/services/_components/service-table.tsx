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
  DollarSign,
  Calendar,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import Service from "@/app/(Modules)/(shared)/__entities/service";
import Link from "next/link";

const ServiceTable = ({ services }: { services: Service[] }) => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Services</h2>
            <p className="text-sm text-muted-foreground">
              Manage your service offerings
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            {services.length} Total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-50 font-semibold">
                  Service Name
                </TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="font-semibold">Images</TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {services.map((service, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    {service.name || (
                      <span className="text-muted-foreground italic">
                        Unnamed
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{service.duration} min</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-lg">
                        ${service.price}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(service.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {service.images.length > 0 ? (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-green-50 dark:bg-green-950"
                      >
                        <ImageIcon className="h-3 w-3" />
                        {service.images.length}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        No images
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/services/${service.id}/booking`}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link
                        href={`/provider-dashboard/services/${service.id}/update`}
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

export default ServiceTable;
