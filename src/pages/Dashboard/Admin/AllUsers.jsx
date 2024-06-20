import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { AllUsersList } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import AllUsersTableRow from "@/components/Dashboard/AllUsersTableRow";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AllUsers = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allUserslist", user?.email],
    queryFn: async () => await AllUsersList(user?.email),
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) {
      const itemCount = data.length;
      // setCount(itemCount);
      const totalPages = Math.ceil(itemCount / 5);
      const newPages = [...Array(totalPages).keys()];
      setPages(newPages);
    }
  }, [data]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  console.log(currentPage);

  if (isLoading || !user?.email) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="w-full px-2 py-10 sm:px-3 md:px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
      </div>

      <div className="relative max-w-[270px] overflow-x-scroll sm:max-w-[600px] md:max-w-[480px] lg:max-w-[660px] xl:max-w-[1080px] 2xl:max-w-full 2xl:overflow-hidden">
        <Table className="w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow className="border-input">
              <TableHead className="font-bold">User{"'"}s Name</TableHead>
              <TableHead className="font-bold">Phone Number</TableHead>
              <TableHead className="font-bold">Parcel Booked</TableHead>
              <TableHead className="font-bold">Total Spent</TableHead>
              <TableHead className="font-bold">User Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-x-auto">
            {!data || data.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-center text-xl font-medium text-red-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <AllUsersTableRow
                  key={item?._id}
                  allData={item}
                  refetch={refetch}
                />
              ))
            )}
          </TableBody>
        </Table>

        {/* //pagination */}
        <Pagination className="mt-6 justify-start pb-5">
          <PaginationContent className="rounded-sm border border-input">
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrev}
                className="cursor-pointer"
              />
            </PaginationItem>

            {pages.map((item, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(item)}
                    className={`cursor-pointer ${currentPage === item ? "bg-[#f7b814]" : ""}`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
            <PaginationItem>
              <PaginationNext onClick={handleNext} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {/* //pagination */}
      </div>
    </div>
  );
};

export default AllUsers;
