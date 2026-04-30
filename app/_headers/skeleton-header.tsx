"use client";

import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="w-full flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
