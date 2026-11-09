import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <PagePlaceholder
      title="Terms of Service"
      description="Our terms of service will be published here. This page is coming soon."
    />
  );
}
