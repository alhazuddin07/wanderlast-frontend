import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  {
    id: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
    divider: "",
  },
  {
    id: "date",
    label: "Date/Duration",
    placeholder: "Anytime/ 3 Days",
    divider: "border-l",
  },
  {
    id: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    divider: "border-t lg:border-t-0 lg:border-l",
  },
  {
    id: "people",
    label: "People",
    placeholder: "5-10",
    divider: "border-t lg:border-t-0 border-l",
  },
] as const;

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by lush green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-2xl text-sm text-white/90 sm:text-base md:text-lg">
          Explore breathtaking destinations and create unforgettable memories with
          our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-md bg-[#0ea5c9] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0c93b5]"
          >
            Explore Now
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/destinations"
            className="rounded-md bg-white/20 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative grid grid-cols-2 bg-black/30 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {searchFields.map((field) => (
          <div
            key={field.id}
            className={`border-white/20 px-6 py-3.5 ${field.divider}`}
          >
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold text-white"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
              className="w-full bg-transparent text-white outline-none placeholder:text-white/60"
            />
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 bg-[#0ea5c9] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#0c93b5] lg:col-span-1"
        >
          Search
        </button>
      </div>
    </section>
  );
}
