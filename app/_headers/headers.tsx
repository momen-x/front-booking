// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, Menu, X } from "lucide-react";
import { ModeToggleBtn } from "./ModeToggleBtn";
import { useRouter } from "next/navigation";
import NotificationButton from "./notifications";
import LogoutBtn from "../(Modules)/(auth)/_logout/logout-btn";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/providers", label: "Providers" },
  { href: "/how-it-works", label: "How it Works" },
];

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="w-full flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="font-bold text-blue-600">BookHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <NotificationButton />
          <LogoutBtn />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
          <Button size="sm" onClick={() => router.push("/register")}>
            Sign Up
          </Button>
          <Button variant="outline" size="sm">
            Become a Pro
          </Button>
          <ModeToggleBtn />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              {label}
            </Link>
          ))}
          <hr />
          <Button size={"icon"}>
            <BellRing />
          </Button>
          <Button variant="ghost" className="justify-start">
            Sign In
          </Button>
          <Button onClick={() => router.push("/register")}>Sign Up</Button>
          <Button variant="outline">Become a Pro</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
