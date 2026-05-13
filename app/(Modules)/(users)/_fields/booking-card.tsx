import { Lock, Mail } from "lucide-react";
const fields = [
  {
    name: "providerId",
    title: "",
    placeholder: "",
    icon: <Mail className="hidden w-4" />,
    hidden: true,
  },
  {
    name: "serviceId",
    title: "",
    placeholder: "",
    icon: <Lock className="hidden w-4" />,
    hidden: true,
  },
  {
    name: "date",
    title: "Select a Date",
    placeholder: "",
    icon: <Lock className="hidden w-4" />,
    type: "date",
    hidden: false,
  },
] as const;

export default fields;
