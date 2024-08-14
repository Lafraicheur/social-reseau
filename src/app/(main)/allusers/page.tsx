import { Metadata } from "next";
import AllUsers from "./AllUsers";
import TrendsSidebar from "@/components/TrendsSidebar";

interface PageProps {
  searchParams: { q: string };
}

export function generateMetadata(): Metadata {
  return {
    title: `Liste des utilisateurs`,
  };
}

export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold mb-4">
            Liste des utilisateurs
          </h1>
          <AllUsers />
        </div>
      </div>
      <TrendsSidebar />
    </main>
  );
}
