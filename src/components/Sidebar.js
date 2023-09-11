import {
  Bell,
  Home,
  Mail,
  MoreHorizontal,
  PanelTop,
  Search,
  Twitter,
  User,
  Users,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("no user");
      router.push("/login");
    }
  }, [user]);
  const name = user?.user_metadata?.name;
  const username = user?.user_metadata?.username;

  return (
    <div className="py-4 flex flex-col justify-between items-start">
      <div className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-200 w-min transition-all duration-150 ease-out">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </div>

      <div className="mt-2 fle x-1 grid gap-2">
        <SideBarItem icon={Home} title="Home" isActive />
        <SideBarItem icon={Search} title="Explore" />
        <SideBarItem icon={Bell} title="Notifications" />
        <SideBarItem icon={Mail} title="Messages" />
        <SideBarItem icon={PanelTop} title="Lists" />
        <SideBarItem icon={Users} title="Communities" />
        <SideBarItem icon={Twitter} title="Verified" />
        <SideBarItem icon={User} title="Profile" />
        <SideBarItem icon={MoreHorizontal} title="More" />
        <Button className="rounded-full  w-min px-24 text-xl py-6">Post</Button>
      </div>

      <div className="fle x-1  flex justify-end mt-12">
        <Popover>
          <PopoverTrigger>
            <div
              className="flex items-center space-x-4 p-2 rounded-full
         hover:bg-gray-200 hover:cursor-pointer transition-all duration-150 ease-out"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  alt="@shadcn"
                />
              </Avatar>
              <div className="">
                <p className="font-bold">{name}</p>
                <p>@{username}</p>
              </div>
              <MoreHorizontal />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <p
              className="hover:cursor-pointer p-2 rounded-md hover:bg-gray-200"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
              }}
            >
              Log out @{username}
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const SideBarItem = ({ icon: Icon, title, isActive }) => {
  return (
    <div className="hover:cursor-pointer group">
      <div
        className={
          "flex items-center space-x-4 pr-6 pl-3 py-2 rounded-full  group-hover:bg-gray-200 w-min transition-all duration-150 ease-out"
        }
      >
        <Icon />
        <p className={`text-xl ${isActive && `font-bold`}`}>{title}</p>
      </div>
    </div>
  );
};
