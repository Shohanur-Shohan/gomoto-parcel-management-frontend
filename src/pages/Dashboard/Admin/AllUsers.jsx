import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { AllUsersList } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import AllUsersTableRow from "@/components/Dashboard/AllUsersTableRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllUsers = () => {
  const [Auth] = useAuth();
  const { user } = Auth;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allUserslist", user?.email, currentPage],
    queryFn: async () =>
      await AllUsersList({ userEmail: user?.email, currentPage: currentPage }),
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data) {
      const itemCount = data.totalItems;
      const totalPages = Math.ceil(itemCount / 5);
      setTotalPages([...Array(totalPages).keys()]);
    }
  }, [data]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      refetch();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages.length - 1) {
      setCurrentPage(currentPage + 1);
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

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
            {!data?.users || data.users.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 text-center text-xl font-medium text-red-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              data.users.map((item) => (
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

            {totalPages.map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index)}
                  className={`cursor-pointer ${currentPage === index ? "bg-[#f7b814]" : ""}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

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
