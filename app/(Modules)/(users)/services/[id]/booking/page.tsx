import IParams from "@/app/(Modules)/type/params";
import BookingServiceCard from "../../../../(provider)/services/_components/booking-service-card";

const BookingServicePage = async ({ params }: IParams) => {
  const { id } = await params;
  const response = await fetch(`http://localhost:5000/api/services/${id}`);
  const service = await response.json();
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div>
      <BookingServiceCard
        {...service}
        businessName="Business Name"
        location="Location"
      />
    </div>
  );
};

export default BookingServicePage;
