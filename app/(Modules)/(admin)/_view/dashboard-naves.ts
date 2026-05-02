import {
  Form,
  GitPullRequestCreate,
  LayoutDashboardIcon,
  MessageSquarePlus,
  Table2,
  User,
} from "lucide-react";

export const dashboardNaves = [
  { icon: LayoutDashboardIcon, label: "Dashboard", path: "/" },
  {
    icon: GitPullRequestCreate,
    label: "Provider Requests",
    path: "providers/requests",
  },
  {
    icon: MessageSquarePlus,
    label: "Add Provider",
    path: "providers/add",
  },
  { icon: User, label: "Users table", path: "/users" },
  {
    icon: Form,
    label: "update provider info",
    path: "/users/users-update-form",
  },
  { icon: Table2, label: "Providers table", path: "/providers" },
  {
    icon: Table2,
    label: "Services table",
    path: "/services",
  },
];
