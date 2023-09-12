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

export default function Tweet({ text, photo_url, name, time, username }) {
  return (
    <div>
      <div
        className="flex items-start space-x-4 w-full hover:cursor-pointer
        transition-all duration-150 ease-out
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
              <div className="flex-1 flex items-center space-x-2 hover:text-red-500  transition-all duration-150 ease-out">
                <Heart className="w-5 h-5" />
                <p>200</p>
              </div>
              <div className="flex-1 flex items-center space-x-2 hover:text-blue-500 transition-all duration-150 ease-out">
                <BarChart2 className="w-5 h-5" />
                <p>200</p>
              </div>
            </div>
            <Share className="w-5 h-5 hover:text-blue-500 transition-all duration-150 ease-out" />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
