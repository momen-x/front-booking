import {
  BriefcaseBusiness,
  MapPin,
  PillBottle,
  ShieldUser,
} from "lucide-react";
const AddProviderFields = [
  {
    name: "userId",
    title: "Enter the user ID *",
    placeholder: "6dc0-22cd-43cc-nn9n-ii00f53ref695",
    icon: <ShieldUser className="h-4 w-4" />,
    required: true,
  },
  {
    name: "businessName",
    title: "Enter the Business name *",
    placeholder: "e.g. hair cut salon",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    required: true,
  },

  {
    name: "description",
    title: "Enter description",
    placeholder: "here will find the best services",
    icon: <PillBottle className="h-4 w-4" />,
    required: false,
  },
  {
    name: "location",
    title: "Enter location",
    placeholder: "Palestine",
    icon: <MapPin className="h-4 w-4" />,
    required: false,
  },
] as const;

export default AddProviderFields;
