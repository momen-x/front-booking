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
import { Calendar, Clock, DollarSign, MapPin, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Service from "../../../(public)/services/_entity/service";
import { defaultImage } from "@/app/utils/constance";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const availableTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

const BookingServiceCard = ({
  name,
  duration,
  price,
  createdAt,
  id,
  images,
  businessName,
  location,
}: Service & { businessName: string; location: string }) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image Gallery */}
          <div className="relative">
            <div className="relative h-64 md:h-full min-h-75 bg-linear-to-br from-gray-100 to-gray-200">
              <Image
                src={images[0] || defaultImage}
                alt={name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-black/70 text-white hover:bg-black/70">
                Popular
              </Badge>
            </div>
            {images.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-16 h-16 rounded-md overflow-hidden cursor-pointer ring-2 ring-white"
                    >
                      <Image
                        src={image}
                        alt={`${name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Details */}
          <div className="p-6">
            <CardHeader className="px-0 pt-0">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                  <p className="text-sm text-gray-500 mt-1">{businessName}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {price}
                  </div>
                  <p className="text-xs text-gray-400">per person</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0 space-y-4">
              {/* Service Details */}
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{duration} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Started {transformingTheDateToATextString(createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{location}</span>
              </div>

              <Separator />

              {/* Day Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Select a Day
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        selectedDay === day
                          ? "bg-primary text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDay && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Select a Time
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-primary text-white shadow-md scale-105"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <Separator />

            <CardFooter className="px-0 pt-6">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                disabled={!selectedDay || !selectedTime}
              >
                Book Appointment - ${price}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      {/* Booking Summary (shown when both day and time are selected) */}
      {selectedDay && selectedTime && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 text-green-800">
            <User className="h-5 w-5" />
            <p className="text-sm font-medium">
              Ready to book: {selectedDay} at {selectedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingServiceCard;
