// app/my-bookings/page.tsx (Server Component)

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Scissors,
  User,
} from "lucide-react";
import Link from "next/link";
import Bookings from "../../(shared)/__entities/booking";
import { getStatusConfig } from "./_utils/getStatusConfig";
import transformingTheDateToATextString from "../../utils/date-to-string";
import { cookies } from "next/headers";

// Booking Card Component
function BookingCard({ booking }: { booking: Bookings }) {
  const statusConfig = getStatusConfig(booking.status);
  const bookingDate = transformingTheDateToATextString(booking.date);
  const startTime = transformingTheDateToATextString(booking.startTime);
  const endTime = transformingTheDateToATextString(booking.endTime);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative">
        {/* Status Ribbon */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className={`${statusConfig.className} font-medium px-3 py-1`}>
            <span className="mr-1">{statusConfig.icon}</span>
            {statusConfig.label}
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Section - Service Info */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {booking.service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Scissors className="h-3.5 w-3.5" />
                    {booking.service.duration} minutes
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5 text-2xl font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {booking.service.price}
                  </div>
                  <p className="text-xs text-muted-foreground">total</p>
                </div>
              </div>

              {/* Provider Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {booking.provider.businessName}
                  </span>
                </div>
                {booking.provider.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.provider.location}</span>
                  </div>
                )}
              </div>

              {/* Date & Time */}
              <div className="space-y-1.5 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {startTime} – {endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="border-t md:border-t-0 md:border-l border-border/50 p-6 bg-muted/20 md:w-48 flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/services/${booking.serviceId}/booking`}>
                  View Service
                </Link>
              </Button>

              {booking.status === "CONFIRMED" && (
                <Button variant="destructive" size="sm" className="w-full">
                  Cancel Booking
                </Button>
              )}

              {booking.status === "PENDING" && (
                <Button variant="default" size="sm" className="w-full">
                  <Link href={"/payments-confirm"}>Confirm Payment</Link>
                </Button>
              )}

              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href={`/providers/${booking.providerId}`}>
                  View Provider
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Main Page Component
export default async function MyBookingsPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const token = cookieStore.get("token")?.value;
  // Fetch bookings from your API
  // const bookings: Bookings[] = await fetchBookings();
  const response = await fetch(
    "http://localhost:5000/api/bookings/my-bookings",
    {
      headers: {
        Cookie: allCookies,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Backend failed with status ${response.status}:`, errorText);
    return null;
  }
  const bookings = (await response.json()) as Bookings[];

  // Mock data for demonstration
  // const mockBookings: Bookings[] = [
  //   {
  //     id: "1",
  //     userId: "user123",
  //     providerId: "provider123",
  //     serviceId: "service123",
  //     date: new Date("2026-05-20"),
  //     startTime: new Date("2026-05-20T10:00:00"),
  //     endTime: new Date("2026-05-20T11:00:00"),
  //     status: "CONFIRMED",
  //     deletedAt: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     provider: {
  //       businessName: "Luxury Spa & Wellness",
  //       location: "123 Main St, Downtown",
  //     },
  //     service: {
  //       name: "Deep Tissue Massage",
  //       duration: 60,
  //       price: 89.99,
  //     },
  //   },
  //   {
  //     id: "2",
  //     userId: "user123",
  //     providerId: "provider456",
  //     serviceId: "service456",
  //     date: new Date("2026-05-25"),
  //     startTime: new Date("2026-05-25T14:30:00"),
  //     endTime: new Date("2026-05-25T15:30:00"),
  //     status: "PENDING",
  //     deletedAt: null,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     provider: {
  //       businessName: "Elite Barber Club",
  //       location: "456 Oak Avenue",
  //     },
  //     service: {
  //       name: "Haircut + Beard Trim",
  //       duration: 45,
  //       price: 45.0,
  //     },
  //   },
  //   {
  //     id: "3",
  //     userId: "user123",
  //     providerId: "provider789",
  //     serviceId: "service789",
  //     date: new Date("2026-05-15"),
  //     startTime: new Date("2026-05-15T09:00:00"),
  //     endTime: new Date("2026-05-15T10:30:00"),
  //     status: "CANCELLED",
  //     deletedAt: new Date(),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     provider: {
  //       businessName: "Nail Art Studio",
  //       location: "789 Pine Street",
  //     },
  //     service: {
  //       name: "Gel Manicure + Pedicure",
  //       duration: 90,
  //       price: 75.0,
  //     },
  //   },
  // ];

  // const bookings = mockBookings; // Replace with actual API call

  // Group bookings by status
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  const sections = [
    {
      title: "Upcoming Appointments",
      bookings: confirmedBookings,
      emptyMsg: "No upcoming appointments",
    },
    {
      title: "Pending Confirmation",
      bookings: pendingBookings,
      emptyMsg: "No pending bookings",
    },
    {
      title: "Cancelled",
      bookings: cancelledBookings,
      emptyMsg: "No cancelled bookings",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Bookings
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your appointments in one place
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-linear-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">
                  {confirmedBookings.length}
                </p>
                <p className="text-sm text-green-600">Confirmed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-yellow-50 to-yellow-100/50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-700">
                  {pendingBookings.length}
                </p>
                <p className="text-sm text-yellow-600">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-gray-50 to-gray-100/50 border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">
                  {cancelledBookings.length}
                </p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                {section.title}
                <Badge variant="secondary" className="text-xs">
                  {section.bookings.length}
                </Badge>
              </h2>

              {section.bookings.length === 0 ? (
                <Card className="bg-muted/20 border-dashed">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">{section.emptyMsg}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {section.bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
