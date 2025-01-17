import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/utils/variants";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import useUserType from "@/hooks/useUserType";
import { useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [postion, setPosition] = useState(true);

  const [Auth] = useAuth();
  const { loading, logOut, setLoading, user } = Auth;
  const [path, setPath] = useState("");
  const [userType, isLoading] = useUserType();

  //user_type
  const user_type = userType || {};
  const role = user_type?.user_type; //user or delivery_men or admin

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > lastScrollY) {
      // Scrolling down
      setIsHidden(true);
    } else if (y < lastScrollY) {
      // Scrolling up
      setIsHidden(false);
    }
    if (y > 120) {
      setPosition(false);
    } else {
      setPosition(true);
    }
    setLastScrollY(y);
  });

  useEffect(() => {
    if (role) {
      if (role === "admin") {
        setPath("statistics");
      } else if (role === "delivery_men") {
        setPath("delivery-list");
      } else {
        setPath("my-profile");
      }
    }
  }, [role]);

  // console.log(path);

  const handleLogout = () => {
    logOut();
    toast.success("Logout Success");
    setLoading(false);
  };

  return (
    <motion.div
      animate={isHidden ? "hidden" : "visible"}
      variants={{
        hidden: {
          // y: "-100%",
          opacity: [0.5, 0],
        },
        visible: {
          // y: "0%",
          opacity: [0.5, 1],
        },
      }}
      className={`${location?.pathname === "/" ? `fixed ${postion ? "br-transparent" : "bg-[#282932]/50"} ` : "bg-[#282932]"} left-0 top-0 z-50 w-full`}
      // className={`fixed left-0 top-0 z-50 w-full bg-[#282932]`}
    >
      <motion.nav
        variants={fadeAnimation("down", 0.2)}
        initial="hidden"
        whileInView="show"
        className="mx-auto max-w-[1570px] px-2 md:px-4"
      >
        <div className="flex w-full items-center justify-between border-b border-dashed border-[#fff]/15 py-[28px]">
          {/* start */}
          <Link to={"/"}>
            <img
              src="/assets/logo.png"
              className="max-w-[120px] sm:max-w-[140px] md:max-w-[165px]"
            />
          </Link>
          {/* start */}

          {/* center */}
          <ul className="hidden space-x-6 lg:flex">
            <NavLink
              to={"/"}
              className="text-[#fff] transition-colors hover:text-[#f7b814]"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className="text-[#fff] transition-colors hover:text-[#f7b814]"
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/services"}
              className="text-[#fff] transition-colors hover:text-[#f7b814]"
            >
              <li>Services</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className="text-[#fff] transition-colors hover:text-[#f7b814]"
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          {/* center */}

          {/* end */}
          <div className="flex items-center justify-end space-x-2">
            {/* notification */}
            <button
              type="button"
              className="inline-flex items-center justify-center text-sm font-semibold text-white"
            >
              <Bell className="h-[20px] w-[20px] sm:h-6 sm:w-6" />
            </button>
            {/* notification */}

            {/* //theme toggler */}
            <ModeToggle />
            {/* //theme toggler */}

            {/* avatar */}

            {loading && (
              <Skeleton className="h-[35px] w-[35px] rounded-full sm:h-[40px] sm:w-[40px]" />
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px]">
                    <AvatarImage src={user?.photoURL} />
                    <AvatarFallback>
                      <img src="/assets/user.png" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user?.displayName}</DropdownMenuItem>
                  <Link to={`/dashboard/${path}`}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* avatar */}
            {!user && (
              <Link to={"/login"}>
                <Button
                  variant={"default"}
                  className="hidden h-[48px] rounded-full px-[40px] text-[18px] font-bold text-black sm:flex"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* mobile navicon */}
            <div className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 text-sm font-semibold text-white lg:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu size={24} />
                </SheetTrigger>
                <SheetContent>
                  <ul className="mt-10 flex flex-col space-y-6">
                    <Link
                      to={"/"}
                      className="text-center text-[#000] transition-colors hover:text-[#f7b814] dark:text-[#fff]"
                    >
                      Home
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] transition-colors hover:text-[#f7b814] dark:text-[#fff]"
                    >
                      About
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] transition-colors hover:text-[#f7b814] dark:text-[#fff]"
                    >
                      Services
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] transition-colors hover:text-[#f7b814] dark:text-[#fff]"
                    >
                      Contact
                    </Link>
                  </ul>
                  {!user ? (
                    <Button
                      variant={"default"}
                      className="mx-auto mt-[30px] flex h-[48px] rounded-full px-[40px] text-[18px] font-bold text-black sm:hidden"
                    >
                      <Link to={"/login"}>Login</Link>
                    </Button>
                  ) : (
                    <Button
                      variant={"default"}
                      className="mx-auto mt-[30px] flex h-[48px] rounded-full px-[40px] text-[18px] font-bold text-black sm:hidden"
                    >
                      <Link to={`/dashboard/${path}`}>Dashboard</Link>
                    </Button>
                  )}
                </SheetContent>
              </Sheet>
            </div>
            {/* mobile navicon */}
          </div>

          {/* end */}
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Header;
