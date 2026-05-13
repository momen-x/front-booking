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
import Image from "next/image";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import { getAllUser } from "./_utils/serverFunctions";

const UsersTable = async () => {
  const users = await getAllUser();
  if (!users) {
    return <div>No users found</div>;
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
            {users.length} Total
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-50 font-semibold">username</TableHead>
                <TableHead className="font-semibold">email</TableHead>
                <TableHead className="font-semibold">id</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="font-semibold">Image</TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium">
                    {user.username || (
                      <span className="text-muted-foreground italic">
                        Unnamed
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.email} </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FingerprintPattern className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-xs">{user.id}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {transformingTheDateToATextString(user.createdAt)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {user.userImage && (
                      <Image
                        src={user.userImage}
                        alt="user"
                        width={75}
                        height={75}
                        className="rounded-full"
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/admin-dashboard/users/user/${user.id}`}>
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
                        href={`/admin-dashboard/users/users-update-form?id=${user.id}&username=${user.username}&email=${user.email}`}
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

export default UsersTable;
