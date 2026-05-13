/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { defaultImage } from "@/app/utils/constance";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import getErrorMessage from "@/app/(Modules)/utils/getErrorMessage";
import numberToTime from "../../(provider)/provider-dashboard/availability/_utils/getStartAndEndTime";
import Service from "../../(shared)/__entities/service";
import Availability from "../../(shared)/__entities/availability";
import { useCreateBooking } from "../services/_hooks/useCreateBooking";
import getDayOfWeek from "../../(provider)/provider-dashboard/availability/_utils/getDayOfWeek";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ── Validation Schema ─────────────────────────────────────────────────────────

const bookingFormSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  startTime: z.string().min(1, "Please select a time slot"),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

// ── helpers ───────────────────────────────────────────────────────────────────

function formatMinutes(minutes: number): string {
  return numberToTime(minutes).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

function dateToDayNumber(dateStr: string): number {
  return new Date(dateStr).getDay();
}

// Convert local date + time slot to UTC ISO string
function createUTCStartTime(date: string, startMinutes: number): string {
  // Parse the local date components
  const [year, month, day] = date.split("-").map(Number);

  // Calculate hours and minutes from minutes since midnight
  const hours = Math.floor(startMinutes / 60);
  const minutes = startMinutes % 60;

  // Create a local date object (interpreted as local time)
  const localDate = new Date(year, month - 1, day, hours, minutes);

  // Convert to UTC ISO string
  return localDate.toISOString();
}

interface TimeSlot {
  startMinutes: number;
  endMinutes: number;
  label: string;
  isoStartTime: string;
}

function generateTimeSlots(
  availabilities: Availability[],
  dayNumber: number,
  duration: number,
  selectedDate: string,
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayAvail = availabilities.filter((a) => a.dayOfWeek === dayNumber);

  for (const avail of dayAvail) {
    let current = avail.startTime;
    while (current + duration <= avail.endTime) {
      const isoStartTime = createUTCStartTime(selectedDate, current);

      slots.push({
        startMinutes: current,
        endMinutes: current + duration,
        label: `${formatMinutes(current)} – ${formatMinutes(current + duration)}`,
        isoStartTime: isoStartTime,
      });
      current += duration;
    }
  }

  return slots;
}

// ── component ─────────────────────────────────────────────────────────────────

const BookingServiceCard = ({
  id: serviceId,
  providerId,
  name,
  duration,
  price,
  createdAt,
  images,
  businessName,
  location,
  availability,
}: Service & {
  businessName: string;
  location: string;
  availability: Availability[];
}) => {
  const router = useRouter();
  const { mutate: createBooking, isPending } = useCreateBooking();

  const [mainImage, setMainImage] = useState(images[0] || defaultImage);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema as any),
    defaultValues: {
      date: "",
      startTime: "",
    },
    mode: "onChange",
  });

  const selectedDate = watch("date");
  const selectedStartTime = watch("startTime");

  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const dayNumber = dateToDayNumber(selectedDate);
      const slots = generateTimeSlots(
        availability,
        dayNumber,
        duration,
        selectedDate,
      );
      setTimeSlots(slots);
      // Reset selected time when date changes
      setValue("startTime", "");
    }
  }, [selectedDate, availability, duration, setValue]);

  const onSubmit = (data: BookingFormData) => {
    // Find the selected slot to get the correct ISO string
    const selectedSlot = timeSlots.find(
      (slot) => slot.isoStartTime === data.startTime,
    );

    if (!selectedSlot) {
      toast.error("Invalid time slot selected");
      return;
    }

    // Create booking with the correct format (matches Postman example)
    const bookingData = {
      providerId: providerId,
      serviceId: serviceId,
      date: data.date, // YYYY-MM-DD format
      startTime: selectedSlot.startMinutes, // UTC ISO string
    };

    createBooking(bookingData, {
      onSuccess: () => {
        toast.success("Booking confirmed!");
        router.push("/bookings");
      },
      onError: (error) => {
        console.log("the err is : ", error);
        toast.error(getErrorMessage(error) || "Booking failed");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* ── Left: Image ── */}
          <div className="relative">
            <div className="relative h-64 md:h-full min-h-72">
              <Image src={mainImage} alt={name} fill className="object-cover" />
              <Badge className="absolute top-4 left-4 bg-black/60 text-white border-0">
                Popular
              </Badge>
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <Button
                    key={i}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 ring-2 transition-all ${
                      mainImage === img ? "ring-white" : "ring-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Booking Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col">
            <CardHeader className="px-0 pt-0">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h1 className="text-xl font-bold text-foreground">{name}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {businessName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 text-xl font-bold text-primary">
                    <DollarSign className="h-4 w-4" />
                    {price}
                  </div>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0 space-y-4 flex-1">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {duration} mins
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Since {transformingTheDateToATextString(createdAt)}
                </span>
              </div>
              {location && (
                <p className="flex items-start gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  {location}
                </p>
              )}

              <Separator />

              {/* Date picker */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Select a Date
                </h3>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="date"
                      min={todayString()}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  )}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              {/* Generated time slots */}
              {selectedDate && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Available Times —{" "}
                    <span className="font-normal text-muted-foreground">
                      {getDayOfWeek(dateToDayNumber(selectedDate))}
                    </span>
                  </h3>

                  {timeSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center rounded-xl border border-dashed border-border">
                      No availability on this day. Try another date.
                    </p>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                        {timeSlots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setValue("startTime", slot.isoStartTime)
                            }
                            className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-150 ${
                              selectedStartTime === slot.isoStartTime
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-muted/40 text-foreground border-border hover:border-primary/50 hover:bg-muted"
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                      {errors.startTime && (
                        <p className="text-sm text-red-500">
                          {errors.startTime.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </CardContent>

            <Separator className="my-4" />

            <CardFooter className="px-0 pt-0 flex flex-col gap-3">
              {/* Booking summary */}
              {selectedDate && selectedStartTime && (
                <div className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-sm text-muted-foreground animate-in fade-in duration-200">
                  📅{" "}
                  <span className="font-medium text-foreground">
                    {getDayOfWeek(dateToDayNumber(selectedDate))},{" "}
                    {new Date(selectedDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {" · "}
                  <span className="font-medium text-foreground">
                    {timeSlots.find((s) => s.isoStartTime === selectedStartTime)
                      ?.label || selectedStartTime}
                  </span>
                  {" · "}
                  <span>{duration} mins</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold hover:bg-amber-500 hover:text-amber-700 hover:border-amber-500"
                disabled={isPending}
                variant={"outline"}
                size={"sm"}
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  `Book Appointment — $${price}`
                )}
              </Button>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default BookingServiceCard;
