import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Help Center",
};

export default function HelpPage() {
  return (
    <PagePlaceholder
      title="Help Center"
      description="Find answers to common questions about bookings, payments and travel. This page is coming soon."
    />
  );
}
