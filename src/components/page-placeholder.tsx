import Link from "next/link";

export function PagePlaceholder({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-gray-900 md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-md text-gray-500">{description}</p>
      {children && <div className="mt-6">{children}</div>}
      <Link
        href="/"
        className="mt-6 text-sm font-semibold text-[#0ea5c9] hover:underline"
      >
        Back to home
      </Link>
    </section>
  );
}
