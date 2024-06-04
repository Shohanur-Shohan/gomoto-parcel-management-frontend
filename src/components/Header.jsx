import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();

  return (
    <header
      className={`${location?.pathname === "/" ? "absolute" : "bg-[#282932]"} left-0 top-0 z-50 w-full`}
    >
      <nav className="mx-auto max-w-[1570px] px-2 md:px-4">
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
            <Link to={"/"} className="text-[#fff]">
              Home
            </Link>
            <Link to={"/"} className="text-[#fff]">
              About
            </Link>
            <Link to={"/"} className="text-[#fff]">
              Services
            </Link>
            <Link to={"/"} className="text-[#fff]">
              Contact
            </Link>
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
            <Avatar className="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <img src="/assets/avatar.svg" />
              </AvatarFallback>
            </Avatar>

            {/* avatar */}

            <Button
              variant={"default"}
              className="hidden h-[48px] rounded-full px-[40px] text-[18px] font-bold text-black sm:flex"
            >
              <Link to={"/login"}>Login</Link>
            </Button>
            {/* mobile navicon */}
            <div className="inline-flex h-[2.375rem] w-[2.375rem] items-center justify-center gap-x-2 text-sm font-semibold text-white md:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu size={24} />
                </SheetTrigger>
                <SheetContent>
                  <ul className="mt-10 flex flex-col space-y-6">
                    <Link
                      to={"/"}
                      className="text-center text-[#000] dark:text-[#fff]"
                    >
                      Home
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] dark:text-[#fff]"
                    >
                      About
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] dark:text-[#fff]"
                    >
                      Services
                    </Link>
                    <Link
                      to={"/"}
                      className="text-center text-[#000] dark:text-[#fff]"
                    >
                      Contact
                    </Link>
                  </ul>
                  <Button
                    variant={"default"}
                    className="mx-auto mt-[30px] flex h-[48px] rounded-full px-[40px] text-[18px] font-bold text-black sm:hidden"
                  >
                    <Link to={"/login"}>Dashboard</Link>
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
            {/* mobile navicon */}
          </div>

          {/* end */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
