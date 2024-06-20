import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { changeUserType, usersBookedParcels } from "@/utils/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AllUsersTableRow = ({ allData, refetch }) => {
  const { _id, userName, userEmail, user_type, user_phone } = allData;

  const filterInfo = {
    userEmail: userEmail,
    filterStatus: "all",
  };

  const {
    data,
    isLoading,
    error,
    refetch: allUsersRefetch,
  } = useQuery({
    queryKey: ["allUsersTableRow", userEmail],
    queryFn: async () => await usersBookedParcels(filterInfo),
    enabled: !!userEmail && user_type === "user",
  });

  const handleMakeDeliveryMen = async (id) => {
    const updatedInfo = {
      userName: userName,
      userEmail: userEmail,
      user_type: user_type,
      user_phone: user_phone,
      parcel_delivered: [],
      reviews: [],
    };

    const result = await changeUserType({
      id: id,
      changetype: "delivery_men",
      updatedInfo: updatedInfo,
    });
    if (result?.matchedCount > 0) {
      toast.success("New delivey men created!");
      refetch();
    }
  };

  const handleMakeAdmin = async (id) => {
    const result = await changeUserType({ id: id, changetype: "admin" });
    if (result?.matchedCount > 0) {
      toast.success("New admin created!");
      refetch();
    }
  };

  if (!allData || isLoading) {
    return (
      <tr>
        <td colSpan="10">
          <Skeleton className="h-4 w-full" />
        </td>
      </tr>
    );
  }

  const total = data?.reduce(
    (accumulator, objectItem) => accumulator + objectItem?.parcel_price,
    0
  );

  return (
    <>
      <TableRow className="border-input">
        <TableCell>{userName}</TableCell>
        <TableCell>{user_phone}</TableCell>
        <TableCell>{data?.length === 0 ? "0" : data?.length}</TableCell>
        <TableCell>{total}</TableCell>
        <TableCell className="flex gap-2">
          {user_type !== "user" ? (
            <Badge variant="outline">{user_type}</Badge>
          ) : (
            <>
              <Button
                asChild
                type="button"
                variant="secondary"
                className="cursor-pointer"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Delivery Men</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-destructive lg:text-2xl">
                        Are you sure?
                      </DialogTitle>

                      {/* select delivery date */}
                      <Popover className="mb-2 mt-3 w-full">
                        <PopoverTrigger asChild></PopoverTrigger>
                        <PopoverContent className="w-auto p-0"></PopoverContent>
                      </Popover>
                      {/* select delivery date */}
                    </DialogHeader>

                    <DialogFooter className="justify-center sm:justify-center">
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => handleMakeDeliveryMen(_id)}
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Button>
              <Button
                asChild
                type="button"
                variant="secondary"
                className="cursor-pointer"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Admin</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-destructive lg:text-2xl">
                        Are you sure?
                      </DialogTitle>

                      {/* select delivery date */}
                      <Popover className="mb-2 mt-3 w-full">
                        <PopoverTrigger asChild></PopoverTrigger>
                        <PopoverContent className="w-auto p-0"></PopoverContent>
                      </Popover>
                      {/* select delivery date */}
                    </DialogHeader>

                    <DialogFooter className="justify-center sm:justify-center">
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => handleMakeAdmin(_id)}
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

AllUsersTableRow.propTypes = {
  allData: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllUsersTableRow;
