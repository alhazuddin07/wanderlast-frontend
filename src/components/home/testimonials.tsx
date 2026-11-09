"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "The Santorini Sunset Cruise Was Pure Magic. Every Detail Was Thoughtfully Organised And The Crew Made Us Feel Like Family. We Will Definitely Book Again!",
    name: "Emma Wilson",
    location: "London, UK",
    image: "/images/person3.jpg",
  },
  {
    quote:
      "Our Safari In Kenya Was The Trip Of A Lifetime. The Guides Knew Every Animal's Habits And The Lodges Were Beyond Comfortable. Absolutely Unforgettable!",
    name: "David Miller",
    location: "Sydney, Australia",
    image: "/images/person4.jpg",
  },
] as const;

function CarouselArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="hidden shrink-0 gap-3 md:flex">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="size-10 rounded-full border-gray-200 text-gray-400 hover:border-[#0ea5c9] hover:text-[#0ea5c9]"
      >
        <ArrowLeft className="size-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next testimonial"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="size-10 rounded-full border-gray-200 text-gray-700 hover:border-[#0ea5c9] hover:text-[#0ea5c9]"
      >
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start" }}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl text-gray-900 md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-gray-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselArrows />
          </div>

          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-6 md:basis-1/2"
              >
                <article className="flex h-full gap-5 rounded-lg border border-gray-200 bg-white p-5">
                  <div className="flex flex-1 flex-col justify-between">
                    <p className="font-display text-lg leading-snug text-gray-900">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-6">
                      <p className="text-sm font-medium text-[#0ea5c9]">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={200}
                    height={250}
                    className="aspect-4/5 w-36 shrink-0 rounded-lg object-cover sm:w-44"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
