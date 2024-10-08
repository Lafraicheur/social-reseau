import PostEditor from "@/components/post/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import UsersListe from "@/components/UsersListe";

import ForYouFeed from "./ForYouFeed";
import FollowingFeed from "./FollowingFeed";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        <div className="block md:hidden">
          <UsersListe />
        </div>

        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">Tout</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
