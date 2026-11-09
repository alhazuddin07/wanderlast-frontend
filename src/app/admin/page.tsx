import type { Metadata } from "next";
import Link from "next/link";

import { PagePlaceholder } from "@/components/page-placeholder";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <PagePlaceholder
      title="Admin"
      description="Manage destinations, bookings and travelers. This page is coming soon."
    >
      <Button
        render={<Link href="/add-destination" />}
        className="gap-1.5 bg-[#0ea5c9] font-semibold text-white hover:bg-[#0c93b5]"
      >
        Add New Travel Package
      </Button>
    </PagePlaceholder>
  );
}
