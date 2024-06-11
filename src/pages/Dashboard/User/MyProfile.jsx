import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";

export default function MyProfile() {
  const [Auth] = useAuth();
  const { user, loading } = Auth;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loader />;
  }
  const handleProfileUpdate = (data) => {
    console.log(data);
  };
  return (
    <section className="w-full py-[40px]">
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="space-y-6 px-4 sm:px-6"
      >
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <img
              src="https://github.com/shadcn.png"
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-md"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <div className="grid w-full max-w-fit items-center gap-1.5">
                <Input
                  id="picture"
                  type="file"
                  className="max-w-fit bg-[#f7b814]"
                  placeholder="Upload photo"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder=""
                  defaultValue={`${user?.displayName}`}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder=""
                  defaultValue={`${user?.email}`}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">
                  Current Password(optional)
                </Label>
                <Input type="password" id="current-password" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password(optional)</Label>
                <Input type="password" id="new-password" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Confirm Password(optional)
                </Label>
                <Input type="password" id="confirm-password" disabled />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button className="px-[40px] py-6">Update</Button>
        </div>
      </form>
    </section>
  );
}
