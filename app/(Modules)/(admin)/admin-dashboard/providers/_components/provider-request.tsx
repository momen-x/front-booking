/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  IdCard,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import transformingTheDateToATextString from "@/app/(Modules)/utils/date-to-string";
import ProvideRequest from "../_entities/provider-request";
import { useState } from "react";
import Link from "next/link";

const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [index, setIndex] = useState(startIndex);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Counter */}
      {images.length > 1 && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
          {index + 1} / {images.length}
        </span>
      )}

      {/* Image */}
      <div
        className="relative max-w-3xl w-full max-h-[85vh] px-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

// ── Thumbnail ─────────────────────────────────────────────────────────────────
const Thumb = ({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border border-border/50 group/img ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="object-cover transition-transform duration-200 group-hover/img:scale-105"
    />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
      {/* <Eye className="h-5 w-5 text-white" /> */}
      <p className="text-white h-5 t-l">⌞ ⌝</p>
    </div>
  </div>
);

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  PENDING: {
    icon: AlertCircle,
    color: "bg-yellow-500",
    text: "Pending Review",
  },
  APPROVED: { icon: CheckCircle, color: "bg-green-500", text: "Approved" },
  REJECTED: { icon: XCircle, color: "bg-red-500", text: "Rejected" },
};

// ── Main component ────────────────────────────────────────────────────────────
const ProviderRequestCard = (props: ProvideRequest) => {
  const {
    id,
    userId,
    status,
    provideName,
    IDNumber,
    fullName,
    birthday,
    nationality,
    location,
    IDImage,
    selfieIDImage,
    Portfolio,
    createdAt,
    updatedAt,
  } = props;

  const [showFullPortfolio, setShowFullPortfolio] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  const config =
    statusConfig[status as keyof typeof statusConfig] ?? statusConfig.PENDING;
  const StatusIcon = config.icon;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const docImages = [IDImage, selfieIDImage].filter(Boolean);
  const portfolioImages = Portfolio ?? [];
  const visiblePortfolio = showFullPortfolio
    ? portfolioImages
    : portfolioImages.slice(0, 3);

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <Card className="overflow-hidden border bg-card h-full flex flex-col">
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-600 to-purple-600 p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-white shadow-md shrink-0">
                <AvatarImage src={selfieIDImage} alt={fullName} />
                <AvatarFallback className="bg-white text-gray-800 font-semibold">
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg leading-tight">{fullName}</h3>
                <p className="text-sm opacity-80">{provideName}</p>
              </div>
            </div>
            <Badge
              className={`${config.color} text-white border-0 shrink-0 gap-1`}
            >
              <StatusIcon className="h-3 w-3" />
              {config.text}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-5 space-y-4">
          {/* Personal Info */}
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              <User className="h-3.5 w-3.5" /> Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {[
                { label: "ID Number", value: IDNumber },
                { label: "Nationality", value: nationality },
                {
                  label: "Birthday",
                  value: transformingTheDateToATextString(birthday),
                },
                {
                  label: "Location",
                  value: location,
                  icon: <MapPin className="h-3 w-3 inline mr-0.5" />,
                },
              ].map(({ label, value, icon }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-medium">
                    {icon}
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Verification Documents */}
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              <IdCard className="h-3.5 w-3.5" /> Verification Documents
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground text-center">
                  ID Card
                </p>
                <Thumb
                  src={IDImage}
                  alt="ID Card"
                  onClick={() => setLightbox({ images: docImages, index: 0 })}
                  className="rounded-full w-50 h-50"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground text-center">
                  Selfie with ID
                </p>
                <Thumb
                  src={selfieIDImage}
                  alt="Selfie with ID"
                  onClick={() => setLightbox({ images: docImages, index: 1 })}
                  className="rounded-full w-50 h-50"
                />
              </div>
            </div>
          </section>

          {/* Portfolio */}
          {portfolioImages.length > 0 && (
            <>
              <Separator />
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    <Briefcase className="h-3.5 w-3.5" /> Portfolio (
                    {portfolioImages.length})
                  </h4>
                  {portfolioImages.length > 3 && (
                    <Button
                      onClick={() => setShowFullPortfolio((v) => !v)}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {showFullPortfolio
                        ? "Show Less"
                        : `Show All (${portfolioImages.length})`}
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {visiblePortfolio.map((src, i) => (
                    <Thumb
                      key={i}
                      src={src}
                      alt={`Portfolio ${i + 1}`}
                      onClick={() =>
                        setLightbox({ images: portfolioImages, index: i })
                      }
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          <Separator />

          {/* Footer */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Requested: {transformingTheDateToATextString(createdAt)}
              </span>
              {updatedAt !== createdAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated: {transformingTheDateToATextString(updatedAt)}
                </span>
              )}
            </div>

            {status === "PENDING" && (
              <Link
                href={`/admin-dashboard/providers/add?userId=${userId}&location=${location}&businessName=${provideName}&id=${id}`}
              >
                <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Review Application
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProviderRequestCard;
