import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Clock, Calendar, Star } from "lucide-react";
import Link from "next/link";
import Service from "../_entity/service";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";

const defaultImage =
  "https://res.cloudinary.com/dsudicotm/image/upload/v1776600183/ecommerce-billboards/tsxveaa9qpyamqyf6eue.jpg";
const ServiceCard = ({
  images,
  name,
  duration,
  price,
  createdAt,
  id,
}: Service) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl border bg-card h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="aspect-video relative">
          <Image
            src={images[0] || defaultImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-linear-to-r from-amber-500 to-orange-600 text-white border-0 px-3 py-1.5 text-sm font-semibold">
            ${price}
          </Badge>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* Service Name */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-1 mb-2">
          {name}
        </h3>

        {/* Details Grid */}
        <div className="space-y-2 mb-4">
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {duration} {duration === 1 ? "minute" : "minutes"}
            </span>
          </div>

          {/* Created At */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{transformingTheDateToATextString(createdAt)}</span>
          </div>
        </div>

        {/* Book Button */}
        <Link href={`/services/${id}/booking`}>
          <Button className="w-full mt-auto bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2">
            <Star className="h-4 w-4" />
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
