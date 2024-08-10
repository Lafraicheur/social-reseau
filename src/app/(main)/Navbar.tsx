import Image from "next/image";
import UserButton from "@/components/UserButton";
import SearchField from "@/components/SearchField";
import signupImage from "@/assets/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 py-2">
        <div className="block md:hidden relative w-10 h-10">
          <Image
            src={signupImage}
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="hidden md:block text-2xl font-bold text-primary">
          <Link href="/">UICIGBAIRAI</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <SearchField />
        </div>
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
