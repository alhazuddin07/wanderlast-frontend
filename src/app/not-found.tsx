import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-7xl text-[#0ea5c9]">404</p>
      <h1 className="mt-4 font-display text-3xl text-gray-900">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-semibold text-[#0ea5c9] hover:underline"
      >
        Back to home
      </Link>
    </section>
  );
}
