"use client";

import Image from "next/image";
import { CalendarDays, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


interface Booking {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userImage: string;
    destinationId: string;
    destinationName: string;
    country: string;
    duration: string;
    price: number;
    imageUrl: string;
    departureDate: string;
    bookingDate: string;
    status: "confirmed" | "pending" | "cancelled";
}

interface BookingsListProps {
   bookings: Booking[];
}

const BookingsList = ({ bookings }: BookingsListProps) => {

    const route = useRouter();

    const handleCancelBooking = async (booking: Booking) => {

        const {data} = await authClient.token();
        const token = data?.token

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const bookingData = await res.json();
        console.log(bookingData);

        route.refresh();
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center">
                <h3 className="text-lg font-semibold">No bookings found</h3>
                <p className="mt-2 text-sm text-gray-500">
                    You have not booked any destinations yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {bookings.map((booking) => (
                <div
                    key={booking._id}
                    className="flex flex-col gap-5 border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                    {/* Destination Image */}
                    <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-32 sm:w-52">
                        <Image
                            src={booking.imageUrl}
                            alt={booking.destinationName}
                            fill
                            sizes="(max-width: 640px) 100vw, 208px"
                            className="object-cover"
                        />
                    </div>

                    {/* Booking Details */}
                    <div className="min-w-0 flex-1">
                        {/* Status */}
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                booking.status === "confirmed"
                                    ? "bg-green-50 text-green-600"
                                    : booking.status === "pending"
                                      ? "bg-orange-50 text-orange-500"
                                      : "bg-red-50 text-red-500"
                            }`}
                        >
                            {booking.status === "pending" ? (
                                <Clock className="size-3.5" />
                            ) : (
                                <CheckCircle2 className="size-3.5" />
                            )}

                            {booking.status}
                        </span>

                        {/* Destination Name */}
                        <h3 className="mt-2 truncate text-xl font-semibold text-gray-900">
                            {booking.destinationName}
                        </h3>

                        {/* Departure Date */}
                        <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <CalendarDays className="size-3.5 shrink-0" />
                            Departure:{" "}
                            {new Date(
                                `${booking.departureDate}T00:00:00`
                            ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>

                        {/* Booking ID */}
                        <p className="mt-2 text-xs text-gray-500">
                            Booking ID: {booking._id}
                        </p>

                        {/* Price */}
                        <p className="mt-2 text-2xl font-semibold text-[#0ea5c9]">
                            ${booking.price}
                        </p>
                    </div>

                    {/* Cancel Button */}
                    <div className="flex shrink-0 items-center sm:self-end">
                        <button
                            
                            type="button"
                            disabled={booking.status === "cancelled"}
                            onClick={() => handleCancelBooking(booking)}
                            className="inline-flex items-center gap-2 border border-red-300 px-4 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 className="size-3.5" />
                            {booking.status === "cancelled"
                                ? "Cancelled"
                                : "Cancel"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingsList;