import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { usersBookedParcels } from "@/utils/api";

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

  const handleMakeDeliveryMen = (id) => {
    console.log(id);
  };
  const handleMakeAdmin = (id) => {
    console.log(id);
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
                variant="outline"
                onClick={() => handleMakeDeliveryMen(_id)}
              >
                Delivery Men
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleMakeAdmin(_id)}
              >
                Admin
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
