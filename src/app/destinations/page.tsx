import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

interface Destination {
  _id?: string;
  id?: string;
  destination?: string;
  name?: string;
  country: string;
  category?: string;
  price: number | string;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number | string;
}

export default async function AllDestinationPage() {
  let destinations: Destination[] = [];
  

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);

    if (res.ok) {
      destinations = await res.json();
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50/60 px-5 py-10 md:px-8 md:py-16">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8 space-y-1">
          <h1 className="text-3xl font-bold">Explore All Destinations</h1>
          <p className="text-[#6c696d]">Find your perfect travel experience from our curated collection</p>
          <p className="text-[#6c696d]">Showing {destinations.length} destinations</p>
        </div>

        {destinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="font-display text-2xl text-gray-800">No destinations available</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please make sure your backend is running or add a new travel package.
            </p>
            <Link
              href="/add-destination"
              className="mt-5 inline-flex items-center rounded-md bg-[#0ea5c9] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b8ba9]"
            >
              Add New Package
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((item, index) => {
              const id = item._id || item.id || String(index);
              const title = item.destination || item.name || "Bali Paradise";
              const country = item.country || "Nepal";
              const price = item.price ?? 2700;
              const duration = item.duration || "7 Days/6 Nights";
              const rating = item.rating || "4.5";
              const imageUrl =
                item.imageUrl ||
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4";

              return (
                <article
                  key={id}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:shadow-md"
                >

                  {/* Image Card Container */}
                  <Link href={`/destinations/${id}`} className="block">
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded bg-white/85 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs backdrop-blur-xs">
                        <span>{rating}</span>
                        <Star className="size-3 fill-gray-900 text-gray-900" />
                      </div>
                    </div>
                  </Link>

                  {/* Content Details */}
                  <div className="mt-3.5 flex flex-col space-y-1.5">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="size-3.5 shrink-0 text-gray-400" />
                      <span>{country}</span>
                    </div>

                    {/* Title & Price */}
                    <div className="flex items-baseline justify-between gap-3">
                      <Link href={`/destinations/${id}`} className="hover:text-[#0ea5c9] transition-colors">
                        <h3 className="font-display text-lg font-normal text-gray-900">
                          {title}
                        </h3>
                      </Link>
                      <div className="shrink-0 text-right">
                        <span className="text-lg font-bold text-gray-900">
                          ${price}
                        </span>
                        <span className="text-xs font-normal text-gray-500">
                          /Person
                        </span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="size-3.5 shrink-0 text-gray-400" />
                      <span>{duration}</span>
                    </div>

                    {/* Action Link */}
                    <div className="pt-2">
                      <Link
                        href={`/destinations/${id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-[#0ea5c9] uppercase transition-colors hover:text-[#0b8ba9]"
                      >
                        <span>BOOK NOW</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
