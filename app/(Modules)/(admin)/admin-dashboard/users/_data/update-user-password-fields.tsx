import { Lock, Mail } from "lucide-react";
const fields = [
  {
    name: "email",
    title: "Enter user email",
    placeholder: "example@example.com",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    name: "password",
    title: "Enter the new password",
    placeholder: "e.g. The best hair cut salon",
    icon: <Lock className="h-4 w-4" />,
  },
] as const;

export default fields;
