import TableItem from "@/components/Dashboard/TableItem";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useAuth from "@/hooks/useAuth";
import { usersBookedParcels } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MyParcels = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const [Status, setStatus] = useState("all");

  const userEmail = user?.email;
  const filterInfo = {
    userEmail: userEmail,
    filterStatus: Status,
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userBookedParcels", userEmail, filterInfo],
    queryFn: async () => await usersBookedParcels(filterInfo),
    enabled: !!userEmail && !!filterInfo,
  });

  if (isLoading || !userEmail) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading parcels</div>;
  }

  return (
    <div className="w-full px-2 py-10 sm:px-3 md:px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Your Booked Parcels
        </h2>
      </div>
      <div className="mb-6">
        <Select onValueChange={(e) => setStatus(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="on-the-way">On the way</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full 2xl:overflow-hidden">
        <Table className="w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="border-input">
              <TableHead className="w-[300px] font-medium">
                Parcel Type
              </TableHead>
              <TableHead className="font-medium">Booking Date</TableHead>
              <TableHead className="font-medium">Delivery Date</TableHead>
              <TableHead className="font-medium">
                Approximate Delivery Date
              </TableHead>
              <TableHead className="font-medium">Delivery Men ID</TableHead>
              <TableHead className="w-[120px] font-medium">Status</TableHead>
              <TableHead className="w-[90px] text-right font-medium">
                Update
              </TableHead>
              <TableHead className="w-[90px] text-right font-medium">
                Cancel
              </TableHead>
              <TableHead className="w-[90px] text-right font-medium">
                Review
              </TableHead>
              <TableHead className="w-[90px] text-right font-medium">
                Pay
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {!data || data?.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-center text-xl font-medium text-red-500"
                >
                  No parcels found
                </td>
              </tr>
            ) : (
              data?.map((item) => {
                return (
                  <TableItem
                    key={item?._id}
                    data={item}
                    refetch={refetch}
                    user={user}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyParcels;
