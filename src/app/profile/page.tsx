import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <PagePlaceholder
      title="Profile"
      description="Your account details and travel preferences will live here. This page is coming soon."
    />
  );
}
