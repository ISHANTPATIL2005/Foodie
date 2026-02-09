"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#02060c] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Foodify
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Order food from your favorite restaurants near you.
              Fast delivery, great taste, and trusted service.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-200 mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Team</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-200 mb-4">
              For Restaurants
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Partner With Us</Link></li>
              <li><Link href="#" className="hover:text-white">Restaurant App</Link></li>
              <li><Link href="#" className="hover:text-white">Business Support</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-200 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6">

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Foodify. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="hover:text-white">Facebook</Link>
              <Link href="#" className="hover:text-white">Instagram</Link>
              <Link href="#" className="hover:text-white">Twitter</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
