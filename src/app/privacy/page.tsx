import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      title="Privacy Policy"
      description="Our privacy policy will be published here. This page is coming soon."
    />
  );
}
