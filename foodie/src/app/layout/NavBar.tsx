"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import ProfileMenu from "./ProfileMenu";
import Logo from "@/app/public/images/logo2.png"
import {Button} from "../components/ui/Button"

export default function Navbar() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 120); // small delay = smooth UX
  };

  return (
    <header className="w-full bg-[#FEF3E2] border-b border-[#F3E6D3]">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#92400E]">
         <Image src={Logo} alt="Foodie Logo" width={130} height={70} />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-6 text-[#78350F] font-bold text-xl">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/restaurants">Restaurants</Link></li>
          <li><Link href="/products">Dishes</Link></li>
        </ul>

        {/* Right */}
      {/* Right */}
<div className="flex items-center gap-3 relative">
  {!token ? (
    <Link href="/auth/login">
      <Button className="px-5 py-2 rounded-full">
        Login
      </Button>
    </Link>
  ) : (
    <>
      {/* Cart */}
      <Link
        href="/Cart"
        className="
          p-2.5
          rounded-full
          hover:bg-[#FDE68A]
          transition
          flex
          items-center
          justify-center
        "
      >
        <ShoppingCart
          size={22}
          className="text-[#78350F]"
        />
      </Link>

      {/* Profile */}
      <div
        className="relative"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div
          className="
            p-2.5
            rounded-full
            hover:bg-[#FDE68A]
            transition
            cursor-pointer
            flex
            items-center
            justify-center
          "
        >
          <User
            size={22}
            className="text-[#78350F]"
          />
        </div>

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 mt-3
            transition-all duration-200 ease-out
            ${open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
        >
          <ProfileMenu />
        </div>
      </div>
    </>
  )}
</div>


      </nav>
    </header>
  );
}
