"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";


const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/destinations", label: "Destinations", active: false },
  { href: "/add-destination", label: "Add Destinations", active: false },
  { href: "/bookings", label: "My Bookings", active: false },
];

export function Navbar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    authClient.signOut();
    redirect('/login');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="relative flex h-14 items-center justify-between px-5 container mx-auto">
        <nav className="hidden items-center gap-5 md:flex md:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#0ea5c9] ${isActive ? "text-[#0ea5c9] border-b-2 border-[#00A8E8] pb-0.5 font-medium" : "text-gray-700"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-gray-700 md:gap-6">



          {
            user ? <>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 transition-colors hover:text-[#0ea5c9]"
              >
                <User className="size-4" aria-hidden />
                Profile
              </Link>

              <Popover>
                <PopoverTrigger nativeButton={false} render={<Avatar>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>}>

                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>{user?.email}</PopoverDescription>
                    <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
                  </PopoverHeader>
                </PopoverContent>

              </Popover>
            </>
              : <>
                <Link
                  href="/login"
                  className="rounded-lg border border-[#0ea5c9] px-4 py-2 font-semibold text-[#0ea5c9] transition-all duration-200 hover:bg-[#0ea5c9] hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-[#0ea5c9] px-4 py-2 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0891b2] hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
          }

        </div>
      </div>
    </header>
  );
};
