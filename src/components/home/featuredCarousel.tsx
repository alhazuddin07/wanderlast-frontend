
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import type { Destination } from "@/types/destination";

interface FeaturedCarouselProps {
    destinations: Destination[];
}

const FeaturedCarousel = ({
    destinations,
}: FeaturedCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const total = destinations.length;

    const scrollCarousel = (direction: "prev" | "next") => {
        const container = carouselRef.current;

        if (!container) return;

        const card = container.querySelector<HTMLElement>(
            "[data-destination-card]"
        );

        if (!card) return;

        const gap = 12;
        const step = card.offsetWidth + gap;

        container.scrollBy({
            left: direction === "next" ? step : -step,
            behavior: "smooth",
        });

        const maxIndex = Math.max(0, total - 1);

        setCurrentIndex((prev) =>
            direction === "next"
                ? Math.min(prev + 1, maxIndex)
                : Math.max(prev - 1, 0)
        );
    };

    if (!destinations.length) {
        return (
            <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
                <h2 className="text-3xl font-semibold">
                    Featured Destinations
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    No featured destinations available right now.
                </p>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl overflow-hidden px-5 py-12 md:px-8">
            {/* Heading */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-medium tracking-tight text-gray-900 md:text-[34px]">
                        Featured Destinations
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                        Handpicked travel experiences for the adventure seekers
                    </p>
                </div>

                <Link
                    href="/destinations"
                    className="inline-flex shrink-0 items-center gap-3 border border-[#0ea5c9] px-3 py-2.5 text-[10px] font-medium uppercase tracking-wide text-[#0ea5c9] transition hover:bg-[#0ea5c9] hover:text-white sm:px-4"
                >
                    All Destinations
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
                onScroll={(e) => {
                    const container = e.currentTarget;
                    const card =
                        container.querySelector<HTMLElement>(
                            "[data-destination-card]"
                        );

                    if (!card) return;

                    const step = card.offsetWidth + 12;
                    const index = Math.round(
                        container.scrollLeft / step
                    );

                    setCurrentIndex(
                        Math.min(index, total - 1)
                    );
                }}
            >
                {destinations.map((destination) => {
                    const id =
                        destination._id || destination.id;

                    const name =
                        destination.destination ||
                        destination.name ||
                        "Destination";

                    return (
                        <article
                            key={id}
                            data-destination-card
                            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-24px)/3)]"
                        >
                            {/* Image */}
                            <Link
                                href={`/destinations/${id}`}
                                className="group relative block h-53.75 overflow-hidden bg-gray-100"
                            >
                                <img
                                    src={destination.imageUrl}
                                    alt={name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-white/95 px-2 py-1 text-[10px] font-medium text-gray-900">
                                    {Number(
                                        (destination as Destination & {
                                            rating?: number;
                                        }).rating ?? 4.5
                                    ).toFixed(1)}
                                    <Star className="size-3 fill-black text-black" />
                                </span>
                            </Link>

                            {/* Destination details */}
                            <div className="pt-3">
                                <p className="flex items-center gap-1 text-[10px] text-gray-500">
                                    <MapPin className="size-3" />
                                    {destination.country || "Explore"}
                                </p>

                                <div className="mt-1 flex items-start justify-between gap-3">
                                    <h3 className="line-clamp-1 text-base font-medium text-gray-900">
                                        {name}
                                    </h3>

                                    <p className="shrink-0 text-base font-medium text-gray-900">
                                        ${destination.price}
                                        <span className="text-[9px] font-normal text-gray-500">
                                            /Person
                                        </span>
                                    </p>
                                </div>

                                <p className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-500">
                                    <CalendarDays className="size-3" />
                                    {destination.duration}
                                </p>

                                <Link
                                    href={`/destinations/${id}`}
                                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium text-[#0ea5c9] underline underline-offset-2 transition hover:text-[#087e9c]"
                                >
                                    BOOK NOW
                                    <ArrowUpRight className="size-3.5" />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Pagination and navigation */}
            <div className="mt-7 flex items-center gap-4">
                <span className="shrink-0 text-sm text-gray-900">
                    {currentIndex + 1}/{total}
                </span>

                <div className="h-px flex-1 overflow-hidden bg-gray-200">
                    <div
                        className="h-full bg-[#0ea5c9] transition-all duration-300"
                        style={{
                            width: `${
                                ((currentIndex + 1) / total) * 100
                            }%`,
                        }}
                    />
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        aria-label="Previous destination"
                        onClick={() => scrollCarousel("prev")}
                        disabled={currentIndex === 0}
                        className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#0ea5c9] hover:text-[#0ea5c9] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <button
                        type="button"
                        aria-label="Next destination"
                        onClick={() => scrollCarousel("next")}
                        disabled={currentIndex >= total - 1}
                        className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#0ea5c9] hover:text-[#0ea5c9] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCarousel;