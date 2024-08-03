import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Bookmark, Home, Bell, Mail, Heart } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Acceuil"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Accueil</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link href="#">
          <Bell />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Message"
        asChild
      >
        <Link href="#">
          <Mail />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="#">
          <Heart />
          <span className="hidden lg:inline">Favories</span>
        </Link>
      </Button>

      {/* <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="#">
          <Heart />
          <span className="hidden lg:inline">Favories</span>
        </Link>
      </Button> */}
    </div>
  );
}
