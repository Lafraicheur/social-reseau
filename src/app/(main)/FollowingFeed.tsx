"use client";

import { Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostsPage } from "@/lib/types";
import kyInstance from "@/lib/ky";
import PostsLoadingSkeleton from "@/components/post/PostsLoadingSkeleton";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/post/Post";

export default function FollowingFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/following",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        Aucune publication trouvé. Commencez à suivre des personnes pour voir
        leurs publications ici.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        Une erreur s'est produite lors du chargement des publications.{" "}
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
