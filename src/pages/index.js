import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("no user");
      router.push("/login");
    }
  }, [user]);
  return (
    <main className="grid grid-cols-4 mx-auto h-screen w-4/5 place-content-center">
      <Sidebar />
      <div className=" h-screen col-span-2 bg-blue-400"></div>
      <div className=" h-screen bg-black "></div>
    </main>
  );
}
