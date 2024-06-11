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
import useAuth from "@/hooks/useAuth";
import { sendUserToDB } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [Auth] = useAuth();
  const { setLoading, user, setUser, googleSignin, userSignIn } = Auth;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    try {
      const email = data?.email;
      const password = data?.password;
      userSignIn(email, password)
        .then((userCredential) => {
          if (userCredential) {
            const currentUser = userCredential.user;
            setUser(currentUser);
            setLoading(false);
            toast.success("Welcome Back!");
            navigate(`${location?.state?.form?.pathname || "/"}`);
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          // console.log(errorMessage);
          if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
            toast.error("Wrong Email or Password. Try again!");
          } else {
            toast.error("Login failed!");
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
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
            toast.success("Welcome Back!");
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
            Login
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  {...register("password")}
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
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-500 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <a className="text-sm font-medium text-[#FACC15] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Login
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
            Sign in with Google
          </Button>

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
