import { useQuery } from "react-query";
import Post from "./Post";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import getTweets from "@/lib/tweet/getTweets";
import { useAuth } from "@/lib/auth";
import Tweet from "./Tweet";
import { ScrollArea } from "./ui/scroll-area";

export default function Feed() {
  const { user } = useAuth();
  const tweets = useQuery("tweets", () => getTweets(user?.id));
  console.log(tweets?.data);

  return (
    <div className="h-screen flex  col-span-2">
      <Separator orientation="vertical" />
      <div className="p-4 flex-1">
        <div className="">
          <p className="font-bold text-2xl ">Home</p>
          <div className="mt-12">
            <Tabs defaultValue="following" className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger disable value="for-you">
                  For You
                </TabsTrigger>

                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
              <Separator className="mt-3" />
              <ScrollArea className="h-[750px]  px-4">
                <Post />
                <Separator className="mt-3" />

                <TabsContent value="for-you">For you</TabsContent>
                <TabsContent value="following">
                  {tweets?.data != null && (
                    <div className="flex flex-col max-w-xl">
                      {tweets?.data?.map((tweet) => {
                        return (
                          <Tweet
                            id={tweet.id}
                            key={tweet.id}
                            text={tweet.tweet_text}
                            photo_url={tweet.photo_url}
                            likes={tweet.likes}
                            name={tweet.name}
                            time={tweet.created_at}
                            username={tweet.username}
                          />
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
