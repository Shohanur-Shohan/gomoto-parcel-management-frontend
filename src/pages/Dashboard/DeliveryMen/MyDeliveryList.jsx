import DeliveryListTable from "@/components/Dashboard/DeliveryListTable";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useAuth from "@/hooks/useAuth";
import { allDeliveryLists } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const MyDeliveryList = () => {
  const [Auth] = useAuth();
  const { user } = Auth;

  const userEmail = user?.email;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userBookedParcels", userEmail],
    queryFn: async () => await allDeliveryLists(userEmail),
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
          Your Delivery Lists
        </h2>
      </div>

      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full 2xl:overflow-hidden">
        <Table className="w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="border-input">
              <TableHead className="font-medium">
                Booked User{"'"}s Name
              </TableHead>
              <TableHead className="font-medium">Receivers Name</TableHead>
              <TableHead className="font-medium">
                Booked User{"'"}s Phone
              </TableHead>
              <TableHead className="font-medium">
                Requested Delivery Date
              </TableHead>
              <TableHead className="font-medium">
                Approximate Delivery Date
              </TableHead>
              <TableHead className="font-medium">
                Recievers phone number
              </TableHead>
              <TableHead className="font-medium">Receivers Address</TableHead>
              <TableHead className="font-medium">View Location</TableHead>
              <TableHead className="w-[90px] font-medium">Cancel</TableHead>
              <TableHead className="w-[90px] font-medium">Deliver</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {!data || data?.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-center text-xl font-medium text-red-500"
                >
                  No delivery found
                </td>
              </tr>
            ) : (
              data?.map((item) => {
                return (
                  <DeliveryListTable
                    key={item?._id}
                    data={item}
                    userEmail={userEmail}
                    refetch={refetch}
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

export default MyDeliveryList;
