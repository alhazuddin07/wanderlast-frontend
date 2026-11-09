
import AddDestinationForm from "@/components/destination/add-destination-form";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Add New Travel Package",
};

export default function AddDestinationPage() {
  return (
    <section className="flex-1 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <AddDestinationForm />

      </div>
    </section>
  );
}
