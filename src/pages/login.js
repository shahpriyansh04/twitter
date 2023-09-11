import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import loginUser from "@/lib/auth/loginUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password);
  };
  console.log(errors);
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log into an existing account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Email"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />

            <Input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <Button type="submit" value="Submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
