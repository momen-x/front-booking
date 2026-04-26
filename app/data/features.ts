import { Calendar, Clock, CreditCard, Shield, Star, Zap } from "lucide-react";
import { IFeature, ISteps } from "../types/types";

export const steps: ISteps[] = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up and choose your role - client or provider",
  },
  {
    step: "02",
    title: "Find or List Services",
    description: "Browse services or list your expertise",
  },
  {
    step: "03",
    title: "Book & Earn",
    description: "Book services or start earning from your skills",
  },
];

export const features: IFeature[] = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book services in minutes with our intuitive calendar system",
  },
  {
    icon: Shield,
    title: "Verified Pros",
    description: "All providers are vetted and background-checked",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Pay with confidence using our secure payment system",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all users",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Satisfaction guaranteed or your money back",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get instant booking confirmations and reminders",
  },
];

export const features1: string[] = [
  "Zero commission for 3 months",
  "Free profile & listing",
  "Access to client leads",
  "Analytics & insights",
];

export const feature2: string[] = [
  "Access to 50+ service categories",
  "Secure payment protection",
  "24/7 customer support",
  "Rate & review providers",
];
