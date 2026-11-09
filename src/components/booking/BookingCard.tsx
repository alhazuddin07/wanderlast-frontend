'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import type { Destination } from "@/types/destination";
import { authClient } from "@/lib/auth-client";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface BookingCardProps {
    destination?: Destination | null;
}

const BookingCard = ({ destination }: BookingCardProps) => {

    const price = destination?.price ?? 1299;

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        setError(null);

        if (!user) {
            router.push("/login");
            return;
        }

        const formData = new FormData(form);
        const departureDate = String(formData.get("departureDate") ?? "");

        if (!departureDate) {
            setError("Please choose a departure date.");
            return;
        }

        setIsSubmitting(true);

        try {
            const { data } = await authClient.token();
            const token = data?.token;

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const booking = {
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                userImage: user.image ?? null,
                destinationId: destination?._id || destination?.id || null,
                destinationName:
                    destination?.destination || destination?.name || "Bali Paradise",
                country: destination?.country ?? null,
                duration: destination?.duration ?? null,
                price: destination?.price ?? 1299,
                imageUrl: destination?.imageUrl ?? null,
                departureDate,
                bookingDate: new Date().toISOString(),
                status: "confirmed",
            };

            const res = await fetch(`${API_URL}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(booking),
            });

            if (!res.ok) {
                throw new Error(`Booking failed with status ${res.status}`);
            }

            router.push("/bookings");
        } catch (error) {
            console.error("Error creating booking:", error);
            setError(
                "Could not save your booking. Make sure the booking server is running and try again."
            );
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            <aside className="lg:sticky lg:top-8">
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <span className="text-xs text-gray-500">Starting from</span>

                    <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-bold tracking-tight text-[#0ea5c9] sm:text-4xl">
                            ${price}
                        </span>
                    </div>
                    <span className="block text-xs text-gray-500">per person</span>

                    {/* Date Box */}
                    <form onSubmit={handleBooking}>
                        <Input
                            type="date"
                            name="departureDate"
                            aria-label="Departure date"
                            defaultValue={destination?.departureDate}
                            required
                            className="mt-4"
                        />

                        {error && (
                            <p className="mt-3 text-xs text-red-600" role="alert">
                                {error}
                            </p>
                        )}

                        {!isPending && !user ? (
                            <p className="mt-3 text-xs text-gray-500">
                                <Link href="/login" className="font-semibold text-[#0ea5c9] hover:underline">
                                    Log in
                                </Link>{" "}
                                to book this destination.
                            </p>
                        ) : null}

                        {/* Book Now Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting || isPending}
                            className="mt-4 w-full bg-[#00a8e8] text-white hover:bg-[#0095d1]"
                        >
                            {isSubmitting ? "Booking..." : "Book now"}
                            <ArrowRight />
                        </Button>
                    </form>

                    {/* Assurances list */}
                    <div className="mt-6 space-y-2.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                            <Check className="size-3.5 shrink-0 text-emerald-600 stroke-[2.5]" />
                            <span>Free cancellation up to 7 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="size-3.5 shrink-0 text-emerald-600 stroke-[2.5]" />
                            <span>Travel insurance included</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="size-3.5 shrink-0 text-emerald-600 stroke-[2.5]" />
                            <span>24/7 customer support</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default BookingCard;
