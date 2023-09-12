import { CalendarDays, Image, List, MapPin, Smile } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";
import createTweet from "@/lib/tweet/createTweet";
import { QueryClient, useMutation, useQueryClient } from "react-query";

export default function Post() {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const onSubmit = (data) => {
    mutate(data.tweet, user.id);
  };
  const { mutate } = useMutation(
    "create-tweet",
    (tweet) =>
      createTweet(
        tweet,
        user.id,
        user.user_metadata.photo_url,
        user.user_metadata.name,
        user.user_metadata.username
      ),
    {
      onSuccess: () => {
        resetField("tweet");
        queryClient.refetchQueries("tweets");
      },
    }
  );
  const { user } = useAuth();
  return (
    <div className="flex items-start space-x-5">
      <Avatar className="w-16 h-16">
        <AvatarImage
          src={user?.user_metadata?.photo_url}
          alt={`@${user?.user_metadata?.username}`}
        />
      </Avatar>

      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            type="text"
            maxLength={280}
            placeholder="What's happening?"
            {...register("tweet", {
              required: true,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            className="outline-none my-4 resize-none h-24 border-none placeholder:text-xl w-full "
          />
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Image className="text-blue-500 hover:cursor-pointer" />
              <List className="text-blue-500 hover:cursor-pointer" />
              <Smile className="text-blue-500 hover:cursor-pointer" />
              <CalendarDays className="text-blue-500 hover:cursor-pointer" />
              <MapPin className="text-blue-200 hover:cursor-not-allowed" />
            </div>
            <Button type="submit" className="rounded-full text-lg px-4">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
