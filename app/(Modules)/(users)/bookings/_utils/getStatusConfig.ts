import Bookings from "@/app/(Modules)/(shared)/__entities/booking";

export const getStatusConfig = (status: Bookings["status"]) => {
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        className: "bg-green-100 text-green-700 border-green-200",
        icon: "✅",
      };
    case "PENDING":
      return {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: "⏳",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 border-red-200",
        icon: "❌",
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-700 border-gray-200",
        icon: "📌",
      };
  }
};