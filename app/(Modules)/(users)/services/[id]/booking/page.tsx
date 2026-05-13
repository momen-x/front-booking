import Availability from "@/app/(Modules)/(shared)/__entities/availability";
import Service from "@/app/(Modules)/(shared)/__entities/service";
import IParams from "@/app/(Modules)/type/params";
import BookingServiceCard from "../../../_components/booking-service-card";

const BookingServicePage = async ({ params }: IParams) => {
  const { id } = await params;

  const serviceRes = await fetch(`http://localhost:5000/api/services/${id}`, {
    cache: "no-store",
  });
  if (!serviceRes.ok) return <div>Service not found</div>;
  const service = (await serviceRes.json()) as Service;

  const availabilityRes = await fetch(
    `http://localhost:5000/api/availability/provider/${service.providerId}`,
    { cache: "no-store" },
  );
  const availability: Availability[] = availabilityRes.ok
    ? await availabilityRes.json()
    : [];

  return (
    <BookingServiceCard
      {...service}
      businessName={service.provider.businessName}
      location={service.provider.location ?? ""}
      availability={availability}
    />
  );
};

export default BookingServicePage;
