import moment from "moment/moment";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  BarChart2,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Repeat2,
  Share,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useMutation, useQueryClient } from "react-query";
import createLike from "@/lib/tweet/createLike";
import { cn } from "@/lib/utils";
import removeLike from "@/lib/tweet/removeLike";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import createComment from "@/lib/tweet/createComment";
import { useState } from "react";

export default function Tweet({
  id,
  text,
  photo_url,
  name,
  time,
  username,
  likes,
}) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const like = likes.find((like) => like.user_id === user.id);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "create-like",
    (tweet_id) => createLike(tweet_id, user.id),
    {
      onSuccess: () => {
        queryClient.refetchQueries("tweets");
      },
    }
  );
  const removeMutation = useMutation("remove-like", (id) => removeLike(id), {
    onSuccess: () => {
      console.log("removed");
      queryClient.refetchQueries("tweets");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const commentMutation = useMutation(
    "create-comment",
    (comment) =>
      createComment({
        user_id: user.id,
        tweet_id: id,
        comment_id: null,
        comment_text: comment,
      }),
    {
      onSuccess: () => {
        console.log("removed");
        queryClient.refetchQueries("tweets");
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  const handleLike = () => {
    if (!!like) removeMutation.mutate(like.id);
    else {
      mutate(id, user.id);
    }
  };

  const handleComment = () => {
    commentMutation.mutate(comment);
    setComment("");
  };

  return (
    <div className="w-full  ">
      <div
        className="flex items-start space-x-4 w-full hover:cursor-pointer
        transition-all duration-150 ease-out px-3
      hover:bg-gray-100"
      >
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage src={photo_url} alt={`@${username}`} />
          </Avatar>
        </div>
        <div className="flex-1">
          <div className="items-center justify-between flex ">
            <div className="flex space-x-2 items-center">
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-gray-500"> @{username}</p>
              <p className="text-sm text-gray-500">{moment(time).fromNow()}</p>
            </div>
            <MoreHorizontal
              className="hover:text-blue-500         transition-all duration-150 ease-out
"
            />
          </div>
          <p className=" whitespace-pre-wrap">{text}</p>
          <div className="flex justify-between py-3">
            <div className="flex flex-1 justify-evenly">
              <div className="flex-1 flex items-center space-x-2 hover:text-blue-500 transition-all duration-150 ease-out">
                <MessageSquare className="w-5 h-5" />
                <p>200</p>
              </div>
              <div className="flex-1 flex items-center space-x-2 hover:text-green-500 transition-all duration-150 ease-out">
                <Repeat2 className="w-6 h-6" />
                <p>200</p>
              </div>
              <div
                className="flex-1 flex items-center space-x-2 hover:text-red-500  transition-all duration-150 ease-out"
                onClick={handleLike}
              >
                <Heart
                  fill={like ? "red" : "none"}
                  className={cn("w-5 h-5", like && "text-red-500")}
                />
                <p>{likes.length}</p>
              </div>
              <div className="flex-1 flex items-center space-x-2 hover:text-blue-500 transition-all duration-150 ease-out">
                <BarChart2 className="w-5 h-5" />
                <p>200</p>
              </div>
            </div>
            <Share className="w-5 h-5 hover:text-blue-500 transition-all duration-150 ease-out" />
          </div>
          <div className="flex w-full my-2 items-center gap-2">
            <Avatar className="w-12 h-12 bg-transparent">
              <AvatarImage src={photo_url} alt={`@${username}`} />
            </Avatar>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Comment"
              className="flex-1 py-2 bg-transparent outline-none"
            />
            <Button
              onClick={handleComment}
              className="rounded-full text-md px-4 py-1"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <Separator className="" />
    </div>
  );
}
