import Link from "next/link";
import { ArrowLeft, Calendar, Check, MapPin, Star } from "lucide-react";
import { DestinationActions } from "@/components/destination/destination-actions";
import type { Destination } from "@/types/destination";

import BookingCard from "@/components/booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";



const defaultHighlightsCol1 = [
    "Luxury beachfront accommodation",
    "Traditional Balinese spa treatment",
    "Sunrise trek to Mount Batur",
];

const defaultHighlightsCol2 = [
    "Visit Uluwatu Temple at sunset",
    "Private beach dinner experience",
];

interface DetailPageProps {
    params: Promise<{ id: string }> | { id: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const jwtToken = await auth.api.getToken({
        headers: await headers()
    });
    const token = jwtToken?.token


    let destination: Destination | null = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,{
            headers: {
                authorization:  `Bearer ${token}`
            }
        });

        if (res.ok) {
            destination = await res.json();
        }
    } catch (error) {
        console.error("Error fetching destination:", error);
    }

    // Fallback defaults matching the reference UI if API field is missing
    const title = destination?.destination || destination?.name || "Bali Paradise";
    const country = destination?.country || "Indonesia";
    const duration = destination?.duration || "7 Days / 6 Nights";
    const rating = destination?.rating || "4.9";
    const reviewsCount = destination?.reviewsCount || "234";
    
    const imageUrl =
        destination?.imageUrl ||
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4";

    const overviewDescription =
        destination?.description ||
        "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

    // If custom highlights exist in the data, split them between 2 columns; otherwise use the exact cloned list
    let col1 = defaultHighlightsCol1;
    let col2 = defaultHighlightsCol2;

    if (destination?.highlights && destination.highlights.length > 0) {
        const half = Math.ceil(destination.highlights.length / 2);
        col1 = destination.highlights.slice(0, half);
        col2 = destination.highlights.slice(half);
    }

    return (
        <main className="min-h-screen bg-white text-gray-900">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:py-8 lg:px-8">

                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between pb-6">
                    <Link
                        href="/destinations"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-cyan-500"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 " />
                        <span>Back to Destinations</span>
                    </Link>

                    <DestinationActions destination={destination} />
                </div>

                {/* Hero Banner Image */}
                <div className="relative aspect-16/7 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xs sm:aspect-21/9">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-100" />

                {/* Content Section: 2 Columns */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-12 items-start">

                    {/* Left Column: Details */}
                    <div className="space-y-8">

                        {/* Header / Meta */}
                        <div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                <MapPin className="size-4 shrink-0 text-gray-400" />
                                <span>{country}</span>
                            </div>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                                {title}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Star className="size-4 fill-emerald-600 text-emerald-600" />
                                    <span className="font-bold text-gray-900">{rating}</span>
                                    <span className="text-gray-500">({reviewsCount} reviews)</span>
                                </div>

                                <div className="flex items-center gap-1.5 text-gray-700">
                                    <Calendar className="size-4 text-gray-500" />
                                    <span className="font-semibold text-gray-800">{duration}</span>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                Overview
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                                {overviewDescription}
                            </p>
                        </div>

                        {/* Highlights Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                Highlights
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                                {overviewDescription}
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-y-3.5 sm:grid-cols-2 sm:gap-x-8 text-sm text-gray-700">
                                <div className="space-y-3.5">
                                    {col1.map((item, index) => (
                                        <div key={`col1-${index}`} className="flex items-center gap-2.5">
                                            <Check className="size-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3.5">
                                    {col2.map((item, index) => (
                                        <div key={`col2-${index}`} className="flex items-center gap-2.5">
                                            <Check className="size-4 shrink-0 text-emerald-600 stroke-[2.5]" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Booking Card */}

                    <BookingCard destination={destination} />

                </div>
            </div>
        </main>
    );
}