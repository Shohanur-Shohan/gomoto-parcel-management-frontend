import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useAuth from "@/hooks/useAuth";
import { searchByDate } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import AdminAllParcelsTableRow from "@/components/Dashboard/AdminAllParcelsTableRow";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";

const AllParcels = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [filter, setFilter] = useState({ userEmail: user?.email });
  const [clear, setClear] = useState(true);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["searchByDate", filter],
    queryFn: async () => await searchByDate(filter),
    enabled: !!user?.email && !!filter,
  });

  const handleSearch = () => {
    if (dateFrom && dateTo) {
      const info = {
        userEmail: user?.email,
        searchData: {
          dateFrom: format(dateFrom, "PPP"),
          dateTo: format(dateTo, "PPP"),
        },
      };

      setFilter(info);
      toast.success("Searching!");
      setClear(false);
    } else {
      toast.error("Something went wrong");
    }
  };
  const handleClear = () => {
    setClear(true);
    setFilter({ userEmail: user?.email });
  };

  if (isLoading || !user?.email) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading parcels</div>;
  }

  // console.log(data);

  return (
    <div className="w-full px-2 py-10 sm:px-3 md:px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">All Parcels</h2>
      </div>
      <div className="mb-6 grid max-w-[500px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <Popover className="col-span-1">
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateFrom && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "PPP") : <span>Date from</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              id="dateForm"
              mode="single"
              onSelect={setDateFrom}
              // fromDate={new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Popover className="col-span-1">
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateTo && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PPP") : <span>Date to</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              id="dateTo"
              mode="single"
              onSelect={setDateTo}
              // fromDate={new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="destructive"
          className="col-span-1"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="destructive"
          className={`${clear ? "hidden" : "block"} col-span-1`}
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full 2xl:overflow-hidden">
        <Table className="w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="border-input">
              <TableHead className="w-[300px] font-medium">User Name</TableHead>
              <TableHead className="font-medium">User Number</TableHead>
              <TableHead className="font-medium">Booking Date</TableHead>
              <TableHead className="font-medium">
                Requested Delivery Date
              </TableHead>
              <TableHead className="font-medium">Cost</TableHead>
              <TableHead className="w-[120px] font-medium">Status</TableHead>
              <TableHead className="w-[90px] text-right font-medium">
                Manage
              </TableHead>
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
                <AdminAllParcelsTableRow
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

export default AllParcels;
