import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useAuth from "@/hooks/useAuth";
import { allDeliveryMen } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import AllDeliveryMenTableRow from "@/components/Dashboard/AllDeliveryMenTableRow";

const AllDeliveryMens = () => {
  const [Auth] = useAuth();
  const { user } = Auth;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allDeliveryMens"],
    queryFn: async () => await allDeliveryMen(),
    enabled: !!user?.email,
  });

  if (isLoading || !user?.email) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading parcels</div>;
  }

  return (
    <div className="w-full px-2 py-10 sm:px-3 md:px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">All Delivery Mens</h2>
      </div>

      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full 2xl:overflow-hidden">
        <Table className="w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="border-input">
              <TableHead className="font-bold">
                Delivery Man{"'"}s Name
              </TableHead>
              <TableHead className="font-bold">Phone Number</TableHead>
              <TableHead className="font-bold">Parcel Delivered</TableHead>
              <TableHead className="font-bold">Average Reviews</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-center text-xl font-medium text-red-500"
                >
                  No parcels found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <AllDeliveryMenTableRow
                  key={item?._id}
                  allData={item}
                  refetch={refetch}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDeliveryMens;
