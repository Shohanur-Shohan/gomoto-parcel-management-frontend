import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { hostImage } from "@/utils/api";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/config/Firebase.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyProfile() {
  const [Auth] = useAuth();
  const { user, loading } = Auth;
  const [imageUploading, setImageUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loader />;
  }
  const handleProfileUpdate = async (data) => {
    setImageUploading(true);
    const image = data?.image[0];
    const result = await hostImage(image);
    const photoURL = result?.data?.url;
    updateProfile(auth.currentUser, {
      photoURL: photoURL,
    })
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Profile Updating Failed!");
      });
    setImageUploading(false);
  };
  return (
    <section className="w-full py-[40px]">
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="space-y-6 px-4 sm:px-6"
      >
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-[80px] w-[80px] rounded-md sm:h-[96px] sm:w-[96px]">
              <AvatarImage src={user?.photoURL} className="rounded-md" />
              <AvatarFallback className="rounded-md">
                <img src="/assets/user.png" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <div className="grid w-full max-w-fit cursor-pointer items-center gap-1.5">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  {...register("image")}
                  className="max-w-fit cursor-pointer bg-[#f7b814]"
                  placeholder="Upload photo"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card className="border-input py-4">
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
          <Button className="px-[40px] py-6" disabled={imageUploading}>
            {imageUploading ? "Updating" : "Update"}
          </Button>
        </div>
      </form>
    </section>
  );
}
