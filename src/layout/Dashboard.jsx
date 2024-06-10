import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserNavLinks from "../pages/Dashboard/UserNavLinks";
import AdminSideNav from "@/pages/Dashboard/AdminSideNav";
import DeliverySideNav from "@/pages/Dashboard/DeliverySideNav";
import UserSideNav from "@/pages/Dashboard/UserSideNav";
import AdminNavLinks from "@/pages/Dashboard/AdminNavLinks";
import DeliveryMenNavLink from "@/pages/Dashboard/DeliveryMenNavLink";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  const role = "admin";
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-input bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-input px-4 lg:h-[60px] lg:px-6">
            <Link
              to={"/"}
              className="font-catamaran flex items-center justify-start gap-1 font-semibold"
            >
              <img src="/assets/icon.png" className="h-6 w-6" alt="icon" />
              <span className="">GOMOTO</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            {/* desktop sidebar */}
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {role === "admin" ? (
                <AdminNavLinks />
              ) : role === "delivery_men" ? (
                <DeliveryMenNavLink />
              ) : (
                <UserNavLinks />
              )}
            </nav>
            {/* desktop sidebar */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-input bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            {/* mobile sidebar */}
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to={"/"}
                  className="flex items-center gap-1 text-lg font-semibold"
                >
                  <img src="/assets/icon.png" className="h-6 w-6" alt="icon" />
                  <span className="">GOMOTO</span>
                </Link>
                {role === "admin" ? (
                  <AdminSideNav />
                ) : role === "delivery_men" ? (
                  <DeliverySideNav />
                ) : (
                  <UserSideNav />
                )}
              </nav>
            </SheetContent>
            {/* mobile sidebar */}
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          {/* //theme toggler */}
          <ModeToggle />
          {/* //theme toggler */}
          {/* avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <img src="/assets/avatar.svg" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[170px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Shohanur Shohan</DropdownMenuItem>
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* avatar */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div> */}
          <div
            // x-chunk="dashboard-02-chunk-1"
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-input shadow-sm"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
