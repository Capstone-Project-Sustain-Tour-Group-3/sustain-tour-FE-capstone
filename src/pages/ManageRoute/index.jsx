import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoutes } from "@/services/ManageRoute/getRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoutes } from "@/services/ManageRoute/deleteRoute";
import { TableRoute } from "./TableRoute";
import { SearchRoute } from "./SearchRoute";
import { TotalRoute } from "./TotalRoute";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";

export default function ManageRoute() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const useGetAdmin = (page) => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["admin", page],
      queryFn: () => getRoutes(token, page),
      enabled: !!token,
      onError: (error) => {
        console.error("Query error:", error);
      },
    });
    return { data, error, isLoading };
  };

  const { data } = useGetAdmin(currentPage);
  const totalPages = data?.pagination?.last_page;
  const [searchTerm, setSearchTerm] = useState("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = data?.data?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteRoutes(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", currentPage] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  const handleRouteClick = (user) => {
    navigate(`${privateRoutes.ROUTE}/${user.id}`);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDeletedById = (id) => {
    createDeletedMutation.mutate(id);
  };

  console.log("Data route:", data);

  return (
    <ProtectedLayout>
      <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
        <div className="grid grid-cols-12 gap-4">
          <SearchRoute
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
          />
          <TotalRoute filteredData={data?.pagination.total} />
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <TableRoute
            filteredData={filteredData}
            handleRouteClick={handleRouteClick}
            handleDeletedById={handleDeletedById}
            openNotif={createDeletedMutation}
          />
        </div>
        <div className="my-3 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${
              currentPage === 1 ? "text-neutral-400" : "text-primary-500"
            }`}
          >
            &lt;
          </button>
          <span className="px-20 py-2 font-jakarta-sans text-sm font-bold text-neutral-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm ${
              currentPage === totalPages
                ? "text-neutral-400"
                : "text-primary-500"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </ProtectedLayout>
  );
}
