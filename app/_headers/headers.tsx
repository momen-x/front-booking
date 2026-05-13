"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X } from "lucide-react";
import { ModeToggleBtn } from "./ModeToggleBtn";
import { useRouter } from "next/navigation";
import NotificationButton from "./notifications";
import { useCurrentUser } from "../(Modules)/(auth)/_hooks/useCurrentUser";
import HeaderSkeleton from "./skeleton-header";
import { ProfileDropDown } from "./profile-drop-down";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/providers", label: "Providers" },
  { href: "/bookings", label: "Bookings" },
];

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, isLoading, isError } = useCurrentUser();

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  if (!user && !isLoading && !isError) {
    return <HeaderSkeleton />;
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0"
          >
            <Calendar className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-foreground">BookHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop & Mobile Actions - Always visible */}
          <div className="flex items-center gap-2">
            {/* Auth Actions - Visible on both desktop and mobile */}
            {user ? (
              <>
                <NotificationButton />
                <ProfileDropDown />
                {user.role === "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/admin-dashboard")}
                    className="hidden md:flex ml-2"
                  >
                    Admin Panel
                  </Button>
                )}
                {user.role === "PROVIDER" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/provider-dashboard")}
                    className="hidden md:flex ml-2"
                  >
                    Provider Panel
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="hidden sm:flex"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push("/register")}
                  className="hidden sm:flex"
                >
                  Sign Up
                </Button>
              </>
            )}

            <ModeToggleBtn />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Only contains navigation links */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed left-0 top-16 h-full w-full max-w-sm bg-background shadow-xl animate-in slide-in-from-left">
            <div className="flex flex-col p-6 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-3 rounded-lg hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
