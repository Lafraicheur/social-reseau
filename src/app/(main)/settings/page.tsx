import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Seetings from "./Seetings";

export const metadata: Metadata = {
  title: "Seetings",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Mes Paramètres</h1>
        </div>
        <Seetings />
      </div>
      <TrendsSidebar />
    </main>
  );
}
