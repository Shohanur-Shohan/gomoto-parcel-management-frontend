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

const MyParcels = () => {
  const [Auth] = useAuth();
  const { user } = Auth;

  const userEmail = user?.email;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userBookedParcels", userEmail],
    queryFn: async () => await usersBookedParcels(userEmail),
    enabled: !!userEmail,
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
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full">
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
            {!data ? (
              <tr>
                <td colSpan="10" className="py-4 text-center">
                  No parcels found
                </td>
              </tr>
            ) : (
              data?.map((item) => {
                return (
                  <TableItem key={item?._id} data={item} refetch={refetch} />
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
