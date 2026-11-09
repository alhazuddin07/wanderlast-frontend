import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of an airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-24">
        <h2 className="font-display text-4xl text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button
           nativeButton={false}
          render={<Link href="/destinations" />}
          className="mt-8 h-11 gap-2 rounded-none bg-white px-7 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:bg-gray-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </section>
  );
}
