import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [eye, setEye] = useState(false);

  return (
    <section className="flex min-h-[80vh] w-full items-center px-2">
      <Card className="mx-auto w-[400px] dark:border-none">
        <CardHeader className="px-4 py-6 text-center sm:px-6">
          <CardTitle className="text-xl sm:text-[24px] md:text-[28px]">
            Sign Up
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-6 pt-0 sm:px-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Full name</Label>
              <Input
                id="first-name"
                placeholder="Enter your fullname"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <Label>User type</Label>
              <Select className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your type" />
                </SelectTrigger>
                <SelectContent required>
                  <SelectGroup>
                    <SelectLabel>Select your type</SelectLabel>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="delivery_men">Delivery Men</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
              Create an account
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
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
