"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Utiliser next/navigation pour les hooks de navigation
import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import Link from "next/link";
import FollowButton from "./FollowButton";
import FollowerCount from "./FollowerCount";
import Linkify from "./Linkify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";
import { MessageCircle } from "lucide-react";

interface UserTooltipProps {
  user: UserData;
  children: React.ReactNode;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();
  const router = useRouter(); // Utiliser useRouter pour la redirection
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser.id
    ),
  };

  const handleTouchStart = () => {
    // Toggle visibility on touch devices
    setTooltipVisible(!isTooltipVisible);
  };

  const handleTooltipClose = () => {
    setTooltipVisible(false);
  };

  const handleSendMessage = () => {
    // Rediriger vers la page de chat avec l'utilisateur sélectionné
    router.push(`/messages?userId=${user.id}`);
    setTooltipVisible(false);
  };

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipVisible} onOpenChange={setTooltipVisible}>
        <TooltipTrigger
          asChild
          onTouchStart={handleTouchStart}
          onClick={() => setTooltipVisible(true)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent onClick={handleTooltipClose}>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/users/${user.username}`}>
                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
              </Link>
              <button onClick={handleSendMessage}>
                <MessageCircle />
              </button>
              {loggedInUser.id !== user.id && (
                <FollowButton userId={user.id} initialState={followerState} />
              )}
            </div>
            <div>
              <Link href={`/users/${user.username}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user.displayName}
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <Linkify>
                <div className="line-clamp-4 whitespace-pre-line">
                  {user.bio}
                </div>
              </Linkify>
            )}
            <FollowerCount userId={user.id} initialState={followerState} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
