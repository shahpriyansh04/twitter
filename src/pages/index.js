import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import supabase from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <main className="h-screen flex justify-center items-center">
      <Link href="/signup">
        <Button>Signup</Button>
        {user && (
          <Button
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
            }}
          >
            Signout
          </Button>
        )}
      </Link>
    </main>
  );
}
