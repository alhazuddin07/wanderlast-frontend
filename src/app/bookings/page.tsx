import BookingsList from "@/components/booking/BookingsList";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "My Bookings",
};

export default async function BookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  });

  const token = jwtToken?.token

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${user?.email}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();




  return (
    <main className="min-h-screen bg-gray-50/60 px-5 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-1">
          <h1 className="font-display text-3xl text-gray-900 md:text-4xl">
            My Bookings
          </h1>

          <p className="text-[#6c696d]">
            Your upcoming and past trips, all in one place.
          </p>
        </div>

        <BookingsList bookings={bookings} />
      </div>
    </main>
  );
}
