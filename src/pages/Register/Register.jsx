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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { sendUserToDB } from "@/utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Auth] = useAuth();
  const { createUser, updateUserData, setLoading, logOut, googleSignin } = Auth;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (data) => {
    setIsSubmitting(true);
    try {
      const displayName = data?.name;
      const email = data?.email;
      const password = data?.password;
      const userType = data?.user_type;
      const userInfo = {
        userName: displayName,
        userEmail: email,
        user_type: userType,
      };

      //create user
      createUser(email, password)
        .then(async (userCredential) => {
          if (userCredential) {
            updateUserData(displayName);
            const result = await sendUserToDB(userInfo);
            // console.log(result);
            if (result?.insertedId) {
              logOut();
              setLoading(false);
              toast.success("Regristration Success");
              navigate("/login");
            } else if (result?.insertedId === null) {
              logOut();
              setLoading(false);
              toast.error(`${result?.message}, Login Now!`);
              navigate("/login");
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.error("Email already in use, Login now!");
            navigate("/login");
          } else {
            toast.error("Regristration Failed!");
          }
        });
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  //google
  const handleGoogleSignin = () => {
    googleSignin()
      .then(async (result) => {
        const currentUser = result.user;
        // console.log(currentUser);
        const userInfo = {
          userName: currentUser?.displayName,
          userEmail: currentUser?.email,
          user_type: "user",
        };
        if (currentUser) {
          const result = await sendUserToDB(userInfo);
          // console.log(result);
          if (result?.insertedId) {
            setLoading(false);
            toast.success("Account created successfully!");
            navigate(`${location?.state?.form?.pathname || "/"}`);
          } else {
            setLoading(false);
            toast.success("Welcome Back!");
            navigate(`${location?.state?.form?.pathname || "/"}`);
          }
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Login failed!");
        setLoading(false);
      });
  };
  return (
    <section className="flex min-h-[80vh] w-full items-center px-2">
      <Card className="mx-auto w-[400px] dark:border-[#141417] dark:bg-[#141417]">
        <CardHeader className="px-4 py-6 text-center sm:px-6">
          <CardTitle className="text-xl sm:text-[24px] md:text-[28px]">
            Sign Up
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-6 pt-0 sm:px-6">
          <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                {...register("name")}
                placeholder="Enter your fullname"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                {...register("email")}
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <Label>User type</Label>
              <Controller
                name="user_type"
                id="user_type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    className="w-full"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select your type</SelectLabel>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="delivery_men">
                          Delivery Men
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  {...register("password", {
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.#!%*?&^])[A-Za-z\d@$.#!%*?&^]*$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
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
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating" : "Create an account"}
            </Button>
          </form>
          <p className="py-3 text-center text-sm text-gray-400">
            or continue with
          </p>
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className="flex w-full items-center justify-center gap-2"
          >
            <img className="h-4 w-4" src="/assets/google.svg" />
            Sign up with Google
          </Button>

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
