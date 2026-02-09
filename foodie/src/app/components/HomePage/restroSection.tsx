"use client";

import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import Banner from "@/app/public/images/home_banner.jpg";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Rectangle Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center
          rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-10">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Grow Your Restaurant <br />
              <span className="text-indigo-600">
                With Online Orders
              </span>
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Join hundreds of restaurants reaching more customers every day.
              Manage menus, accept orders, and grow your business effortlessly.
            </p>

            <div className="mt-8 flex gap-4">
              <Button
                variant="primary"
                className="px-8 py-4 text-lg font-bold rounded-xl"
                onClick={() => router.push("/restaurant/create")}
              >
                ➕ Add Restaurant
              </Button>

              <button
                className="px-8 py-4 text-lg font-semibold rounded-xl
                border border-gray-300 text-gray-800
                hover:bg-gray-100 transition"
              >
                Explore Restaurants
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={Banner} // add image in public/images
              alt="Delicious food"
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
