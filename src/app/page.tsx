import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import Featured from "@/components/home/featured";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

export default function Home() {
  return (
    <>
      <Banner />
      <Featured />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
};
