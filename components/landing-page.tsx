// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { feature2, features, features1, steps } from "@/app/data/features";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-size-[40px_40px]" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="container relative mx-auto max-w-6xl">
          <div className="text-center">
            <Badge className="mb-6 px-4 py-2 text-sm bg-linear-to-r from-blue-600 to-purple-600 text-white border-0">
              ✨ Launch Special: Zero Commission for First 3 Months
            </Badge>

            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Book Top{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Service Providers
              </span>{" "}
              Instantly
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
              Connect with trusted professionals for any service. From home
              repair to professional consulting - find, book, and pay all in one
              place.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 px-8 text-base bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No booking fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Verified providers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Secure payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Choice Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Join Our Community
            </h2>
            <p className="text-gray-600">
              Choose how you want to use our platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Client Card */}
            <Card className="group relative overflow-hidden transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-blue-600">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">I&apos;m a Client</h3>
                <p className="mb-6 text-gray-600 ">
                  Find and book professional services with ease. Get quality
                  work done by verified experts.
                </p>
                <ul className="mb-8 space-y-3">
                  {feature2.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full group" variant="default">
                  Sign up as Client
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Provider Card */}
            <Card className="group relative overflow-hidden transition-all hover:shadow-xl">
              <div className="absolute -right-12 top-6 rotate-45 bg-linear-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-semibold text-white">
                POPULAR
              </div>
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-purple-600">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">I&apos;m a Provider</h3>
                <p className="mb-6 text-gray-600">
                  Grow your business by offering your services to thousands of
                  potential clients.
                </p>
                <ul className="mb-8 space-y-3">
                  {features1.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline">
                  Become a Provider
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Why Choose Us?
            </h2>
            <p>Everything you need for seamless service booking</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="text-center transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-linear-to-r from-blue-100 to-purple-100 p-3">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              How It Works
            </h2>
            <p>Get started in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-4 text-5xl font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-lg text-blue-100">
                Join thousands of users already booking and providing services
                on our platform
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Sign Up Now - It&apos;s Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
              <p className="mt-6 text-sm text-blue-100">
                No credit card required • Free forever for basic features
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
