import { UserType } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUserType = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const userEmail = user?.email;

  const {
    data: userType,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userType", userEmail],
    queryFn: async () => await UserType(userEmail),
    enabled: !!userEmail,
  });

  if (isLoading) {
    return [];
  }

  return [userType, isLoading];
};

export default useUserType;
