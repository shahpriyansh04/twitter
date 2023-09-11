import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth, useUser } from "@/lib/auth";
import createUser from "@/lib/auth/createUser";
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
    createUser(data.email, data.password, data.name, data.username);
  };
  console.log(errors);
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a new user</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Full Name"
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Email"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Username"
              type="username"
              id="username"
              {...register("username", {
                required: true,
                minLength: 6,
                maxLength: 10,
              })}
            />
            <Input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <Button type="submit" value="Submit">
              Signup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
