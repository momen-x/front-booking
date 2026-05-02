import { User } from "lucide-react";
const fields = [
  {
    name: "username",
    title: "Enter user username",
    placeholder: "hropr",
    icon: <User className="h-4 w-4" />,
  },
] as const;

export default fields;
