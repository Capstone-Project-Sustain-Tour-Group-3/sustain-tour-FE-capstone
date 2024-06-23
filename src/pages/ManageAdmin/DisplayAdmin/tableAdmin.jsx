import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Search from "@/components/icons/Search";
import IcAdmin from "@/components/icons/ic-admin.svg";
import IcAdd from "@/components/icons/ic-add.svg";
import { Input } from "@/components/ui/input";
import IcEdit from "@/components/icons/ic-edit.svg";
import IcDelete from "@/components/icons/ic-delete.svg";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/services/manageAdmin/getUsers";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IlusDelete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import { deleteAdmins } from "@/services/manageAdmin/deleteAdmins";
import { toast } from "sonner";
import { Clear } from "@/components/icons/Clear";
import notFound from "@/assets/icons/not-found.svg";
import { privateRoutes } from "@/constant/routes";
<<<<<<< HEAD
import { getAllAdmins } from "@/services/manageAdmin/getAllAdmins";
import Dialog from "@/components/features/alert/Dialog";
import TrashCan from "@/components/icons/TrachCan";
import Notification from "@/components/features/alert/Notification";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/features/Pagination";
import { NotFound } from "./NotFound";
import Icdelete from "@/assets/ImgModal/Ilustrasi-delete.svg";
import TableSkeleton from "@/components/features/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
=======
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f

export const useGetAdmin = (page) => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin", page],
    queryFn: () => getUsers(token, page),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export const TableAdmin = () => {
  const token = useSelector((state) => state.auth.user?.access_token);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useGetAdmin(currentPage);
  const totalPages = data?.pagination?.last_page;
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [deleted, setDeleted] = useState("");
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  console.log(token);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteAdmins(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", currentPage] });
      setTimeout(() => {
        window.location.reload();
      }, 0);
      setOpenSuccess(true);
    },
    onError: (error) => {
      setOpenError(true);
      toast.error("Gagal melakukan hapus admin");
    },
  });

  const handleDeletedById = (id) => {
    setDeleted(id);
    createDeletedMutation.mutate(id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const filteredData = data?.data?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDetail = (id) => {
    navigate(`${privateRoutes.ADMIN}/detail/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No admin data available</div>;
  }

  return (
<<<<<<< HEAD
    <section className="mx-auto flex h-full w-full flex-col gap-6 px-6 py-6 sm:px-10 ">
      <section className="grid h-full w-full items-center justify-between gap-4 sm:flex">
        <div className="h-full w-full overflow-hidden rounded-[10px] border-none shadow-md">
=======
    <section className="container mx-auto flex h-full flex-col gap-6 py-6">
      <div className="grid items-center justify-between gap-4 sm:flex">
        <div className="h-full w-fit overflow-hidden rounded-[10px] border-none shadow-md sm:w-full ">
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          <Card
            x-chunk="dashboard-05-chunk-1"
            className="flex flex-col gap-4 bg-neutral-50 px-4"
          >
<<<<<<< HEAD
            <CardHeader className="w-full p-4 pb-2">
              <CardTitle className="w-full text-[26px] font-bold text-neutral-800">
                {isLoading ? (
                  <Skeleton className="h-6 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Kelola Admin"
                )}
              </CardTitle>
              <CardDescription className="w-full text-[16px] font-medium text-neutral-700">
                {isLoading ? (
                  <Skeleton className="h-4 w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Kelola data admin dengan mudah!"
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full px-4">
              <div className="grid w-full gap-3 sm:flex sm:items-center sm:gap-3 md:justify-between">
                <div className="relative h-[48px] w-full bg-neutral-50 sm:w-full md:w-[400px]">
                  {isLoading ? (
                    <Skeleton className="absolute left-3 top-2 h-4 w-[24px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                  ) : (
                    <Search className="absolute left-3 top-3" />
                  )}
                  {isLoading ? (
                    <Skeleton className="absolute ml-12 h-5  w-full rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                  ) : (
                    <Input
                      className="border-solid-1 absolute h-full rounded-[10px] bg-transparent py-6 pl-12 font-jakarta-sans text-sm font-normal text-neutral-700"
                      type="text"
                      placeholder="Cari berdasarkan username"
                      onChange={handleSearchChange}
                      autoComplete="off"
                      ref={inputRef}
                      name="search"
                    />
                  )}
                  {search && (
=======
            <CardHeader className="pb-2">
              <CardTitle className="text-[26px] font-bold text-neutral-800">
                Kelola Admin
              </CardTitle>
              <CardDescription className="text-[16px] font-medium text-neutral-700">
                Kelola data admin dengan mudah!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:flex sm:items-center sm:gap-3 md:justify-between">
                <div className="relative h-[48px] w-full bg-neutral-50 sm:w-full md:w-[400px]">
                  <Search className="absolute left-3 top-3" />
                  <Input
                    className="border-solid-1 absolute h-full rounded-[10px] bg-transparent py-6 pl-12 font-jakarta-sans text-sm font-normal text-neutral-700"
                    type="text"
                    placeholder="Cari berdasarkan username"
                    onChange={handleSearchChange}
                    required
                    autoComplete="off"
                    ref={inputRef}
                    name="search"
                  />
                  {searchTerm && (
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
                    <Clear
                      className="absolute right-3 top-3 opacity-75"
                      onClick={handleClear}
                    />
                  )}
                </div>
                <div>
                  <Link to={`${privateRoutes.ADMIN}/create`}>
<<<<<<< HEAD
                    <Button className="flex w-full items-center gap-1 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-10 py-6 text-primary-500 shadow-sm hover:bg-neutral-100 sm:w-fit md:gap-4">
                      {isLoading ? (
                        <Skeleton className="h-4 w-[24px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                      ) : (
                        <img src={IcAdd} sizes="24" alt="" />
                      )}
                      {isLoading ? (
                        <Skeleton className="h-4 w-[100px] rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                      ) : (
                        <span>Tambah Admin</span>
                      )}
=======
                    <Button className="flex w-full items-center gap-1 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-4 py-6 text-primary-500 shadow-sm hover:bg-neutral-100 sm:w-fit md:gap-4">
                      <img src={IcAdd} sizes="24" alt="" />
                      <span>Tambah Admin</span>
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="h-full w-full overflow-hidden rounded-[10px] border-none shadow-md sm:w-[218px] ">
          <Card
            x-chunk="dashboard-05-chunk-1"
<<<<<<< HEAD
            className="flex w-full flex-col gap-2 bg-neutral-50 py-4"
=======
            className="flex h-full w-full flex-col gap-4 bg-neutral-50 px-4 py-4"
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
          >
            <CardHeader className="pb-2">
              <CardDescription>
<<<<<<< HEAD
                {isLoading ? (
                  <Skeleton className="h-4 w-[40px] rounded-full bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  <img src={IcAdmin} sizes="24" alt="" />
                )}
=======
                <img src={IcAdmin} sizes="24" alt="" />
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-semibold text-neutral-900">
<<<<<<< HEAD
                {isLoading ? (
                  <Skeleton className="h-6 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  data?.pagination?.total
                )}
              </CardTitle>
              <div className="text-[16px] font-normal text-muted-foreground text-neutral-900 sm:text-[14px] lg:text-[16px]">
                {isLoading ? (
                  <Skeleton className="h-4 w-full rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-50/0" />
                ) : (
                  "Total Admin"
                )}
=======
                {data?.pagination?.total}
              </CardTitle>
              <div className="font-normal text-muted-foreground text-neutral-900 sm:text-[14px] md:text-[16px]">
                Total Admin
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {filteredData && filteredData.length === 0 ? (
        <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-5">
          <img className="h-[200px] w-[200px]" src={notFound} alt="" />
          <span className="mx-auto flex items-center text-[16px] font-medium">
            Maaf, Hasil Pencarian Tidak Ditemukan!
          </span>
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl bg-neutral-50 shadow-md">
            <Table className="w-full">
              <TableHeader className="bg-primary-500 font-jakarta-sans text-sm font-semibold text-neutral-50 sm:w-full">
                <TableRow className="text-neutral-50 sm:max-w-full">
                  <TableHead className="w-fit text-neutral-50 sm:w-[459px] ">
                    Username
                  </TableHead>
                  <TableHead className="w-fit text-neutral-50 sm:w-[459px] ">
                    Tanggal Pembuatan
                  </TableHead>
                  <TableHead className="w-fit text-center text-neutral-50 sm:w-[200px] ">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="w-full font-jakarta-sans text-sm font-normal text-neutral-800"
                  >
<<<<<<< HEAD
                    <TableCell className="w-fit sm:w-[459px]">
=======
                    <TableCell
                      className="w-fit sm:w-[459px]"
                      onClick={(e) => {
                        if (
                          !e.target.closest("AlertConfirm") &&
                          !e.target.closest("Link")
                        ) {
                          handleDetail(item.id);
                        }
                      }}
                    >
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
                      {item.username}
                    </TableCell>
                    <TableCell className="w-fit sm:w-[459px]">
                      {item.tanggal_pembuatan}
                    </TableCell>
<<<<<<< HEAD
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-fit items-center justify-center gap-2 px-0 sm:w-full sm:gap-7"
                    >
=======
                    <TableCell className="flex w-fit items-center justify-center gap-2 px-0 sm:w-full sm:gap-7">
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
                      <div>
                        <Link to={`${privateRoutes.ADMIN}/edit/${item.id}`}>
                          <img src={IcEdit} sizes="24" alt="" />
                        </Link>
                      </div>
                      <div>
                        <AlertConfirm
                          backround="outline-none bg-transparent border-none rounded-0 w-fit h-fit p-0 hover:bg-transparent"
                          textBtn={<img src={IcDelete} sizes="24" alt="" />}
                          img={IlusDelete}
                          title="Hapus Admin?"
                          desc="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                          textDialogCancel="Batal"
                          textDialogSubmit="Hapus"
                          bgBtn="True"
                          successOpen={openSuccess}
                          setSuccessOpen={setOpenSuccess}
                          errorOpen={openError}
                          setErrorOpen={setOpenError}
                          onConfirm={(e) => handleDeletedById(item.id)}
                        ></AlertConfirm>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pagination my-3 flex items-center justify-center">
            <Button
              className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm hover:text-neutral-50 ${currentPage === 1 ? "text-neutral-400" : "text-primary-500"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <span className="px-8 py-2 font-jakarta-sans text-sm font-bold text-neutral-500 sm:px-20">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className={`rounded-lg bg-neutral-50 px-4 py-2 shadow-sm hover:text-neutral-50  ${currentPage === totalPages ? "text-neutral-400" : "text-primary-500"}`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        </section>
      )}
    </section>
  );
};
