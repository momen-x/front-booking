import { Briefcase, FileText, MapPin } from "lucide-react";
const fields = [
  {
    name: "businessName",
    title: "Business Name",
    placeholder: "e.g. Hair cut salon",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    name: "description",
    title: "Description",
    placeholder: "e.g. The best hair cut salon",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "location",
    title: "Location",
    placeholder: "e.g. Palestine, Gaza, Al-Naser St.",
    icon: <MapPin className="h-4 w-4" />,
  },
] as const;

export default fields;
