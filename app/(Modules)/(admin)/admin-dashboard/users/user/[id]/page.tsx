import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Calendar, Clock } from "lucide-react";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import IParams from "@/app/(Modules)/type/params";
import { getSingleUser } from "../../_utils/serverFunctions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UserDetailPage({ params }: IParams) {
  const { id } = await params;

  const user = await getSingleUser(id);
  if (!user) return <> user not found</>;

  const getInitials = () => {
    return (
      user.username ??
      ""
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div>
        <Link
          href={`/admin-dashboard/users/users-update-form?id=${user.id}&username=${user.username}&email=${user.email}`}
        >
          update{" "}
        </Link>
        <div>
          <Button>Delete </Button>
        </div>
      </div>
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.userImage || undefined} />
              <AvatarFallback className="text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">{user.username}</CardTitle>
          <div className="flex justify-center mt-2">
            <Badge variant="secondary">{user.role}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Joined: {transformingTheDateToATextString(user.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Last updated: {transformingTheDateToATextString(user.updatedAt)}
              </span>
            </div>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>User ID: {user.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
