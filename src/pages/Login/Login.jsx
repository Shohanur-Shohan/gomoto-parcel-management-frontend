import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [eye, setEye] = useState(false);

  return (
    <section className="flex min-h-[80vh] w-full items-center px-2">
      <Card className="mx-auto w-[400px] dark:border-none">
        <CardHeader className="px-4 py-6 text-center sm:px-6">
          <CardTitle className="text-xl sm:text-[24px] md:text-[28px]">
            Login
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={`${eye ? "text" : "password"}`}
                  placeholder="..........."
                  required
                />
                <div
                  className="absolute right-2 top-[25%]"
                  onClick={() => setEye(!eye)}
                >
                  <img
                    className="h-5 w-5"
                    src={`${
                      eye ? "/assets/eyeOpen.svg" : "/assets/closedEye.svg"
                    }`}
                    alt="eye"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2"
            >
              <img className="h-4 w-4" src="/assets/google.svg" />
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
