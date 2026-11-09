

import type { Destination } from "@/types/destination";
import FeaturedCarousel from "./featuredCarousel";

const Featured = async () => {
    let destinations: Destination[] = [];

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/feature-destinations`);

        if (!res.ok) {
            throw new Error("Failed to fetch featured destinations");
        }

        destinations = await res.json();
    } catch (error) {
        console.error("Featured destinations error:", error);
    }

    return <FeaturedCarousel destinations={destinations} />;
};

export default Featured;