"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubscribed(true);
  }

  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-stretch bg-neutral-800"
      >
        <Input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="Enter email"
          className="h-11 flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-white placeholder:text-gray-400 focus-visible:ring-0 dark:bg-transparent"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="flex w-11 shrink-0 items-center justify-center text-white transition-colors hover:bg-neutral-700"
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </button>
      </form>
      {subscribed && (
        <p className="mt-2 text-xs text-[#0ea5c9]">Thanks for subscribing!</p>
      )}
    </div>
  );
}
