import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertConfirm } from "@/components/features/alert/alertConfirm";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Pagination from "@/components/features/Pagination";
import { getContent } from "@/services/manageContent/getContent";
import { deleteContent } from "@/services/manageContent/deleteContent";
import { useDebounce } from "use-debounce";
import content from "@/assets/icons/content.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";
import notFoundImg from "@/assets/icons/not-found.svg";
import AlertDelete from "@/assets/img/alert delete.png";
import { privateRoutes } from "@/constant/routes";
import Notification from "@/components/features/alert/Notification";
import Dialog from "@/components/features/alert/Dialog";
import TrashCan from "@/components/icons/TrachCan";

export default function LandingContent() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery] = useDebounce(searchTerm, 1000);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["content", page, searchQuery],
    queryFn: () => getContent(token, page, searchQuery),
  });

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    if (searchQuery !== "") {
      setSearchParams({ page, searchTerm: searchQuery });
    } else {
      setSearchParams({ page });
    }
  }, [page, searchQuery, setSearchParams]);

  const createDeletedMutation = useMutation({
    // Mengakses token di dalam fungsi createDeletedMutation
    mutationFn: (id) => deleteContent(token, id),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["content", page, searchQuery]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    },
  });

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserClick = (user) => {
    navigate(`${privateRoutes.CONTENT}/detail`, { state: { user } });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const contents = data?.data || [];
  const totalContents = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.last_page || 1;

  const handleDetailClick = (content) => {
    const { id } = content;
    navigate(`${privateRoutes.CONTENT}/detail/${id}`);
  };

  const handleEditClick = (content) => {
    const { id } = content;
    navigate(`${privateRoutes.CONTENT}/edit/${id}`);
  };

  return (
    <ProtectedLayout>
      <main className="flex">
        <div className="flex h-screen w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-10 rounded-lg bg-neutral-50 p-4 shadow-md">
              <h1 className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
                Kelola Konten
              </h1>
              <p className="font-jakarta-sans text-[16px] font-[500] text-neutral-700">
                Kelola data konten dengan mudah!
              </p>
              <div className="mt-4 flex justify-between">
                <div className="flex w-1/2 items-center rounded-lg border px-4 py-3">
                  <img
                    src={search}
                    alt="Search Icon"
                    className="mr-4 h-4 w-4"
                  />
                  <input
                    type="text"
                    placeholder="Cari data konten ..."
                    className="w-full border-none bg-transparent font-jakarta-sans text-neutral-800 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-3 h-4 w-4 text-neutral-800"
                    >
                      &times;
                    </button>
                  )}
                </div>
                <Link
                  to={`${privateRoutes.CONTENT}/create`}
                  className="flex items-center rounded-lg border px-4 py-3 font-jakarta-sans text-primary-500"
                >
                  <img src={plus} alt="Plus Icon" className="mr-4 h-6 w-6" />
                  Tambah Konten
                </Link>
              </div>
            </div>
            <div className="items-left col-span-2 flex flex-col justify-center rounded-lg bg-neutral-50 p-4 shadow-md">
              <img src={content} alt="Person Icon" className="mb-4 h-6 w-6" />
              <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
                {totalContents}
              </p>
              <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
                Total Konten
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
            {contents.length === 0 ? (
              <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-5">
                <img
                  className="h-[200px] w-[200px]"
                  src={notFoundImg}
                  alt="Not Found"
                />
                <span className="mx-auto flex items-center text-[16px] font-medium">
                  Maaf, Hasil Pencarian Tidak Ditemukan!
                </span>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader className="bg-primary-500 text-sm font-semibold">
                    <TableRow>
                      <TableHead className="font-jakarta-sans text-neutral-50">
                        Nama Destinasi
                      </TableHead>
                      <TableHead className="font-jakarta-sans text-neutral-50">
                        Deskripsi Konten
                      </TableHead>
                      <TableHead className="font-jakarta-sans text-neutral-50">
                        Link Terkait
                      </TableHead>
                      <TableHead className="font-jakarta-sans text-neutral-50">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-neutral-50 font-jakarta-sans">
                    {contents.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell
                          onClick={() => handleDetailClick(content)}
                          className="max-w-xs cursor-pointer overflow-hidden truncate whitespace-nowrap"
                        >
                          {content.destination?.name}
                        </TableCell>
                        <TableCell
                          onClick={() => handleDetailClick(content)}
                          className="max-w-xs cursor-pointer overflow-hidden truncate whitespace-nowrap"
                        >
                          {content.title}
                        </TableCell>
                        <TableCell
                          onClick={() => handleDetailClick(content)}
                          className="max-w-xs cursor-pointer overflow-hidden truncate whitespace-nowrap"
                        >
                          {content.url}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <button
                              className="mr-2"
                              onClick={() => handleEditClick(content)}
                            >
                              <img
                                src={edit}
                                alt="Edit Icon"
                                className="h-6 w-6"
                              />
                            </button>
                            <Dialog
                              img={AlertDelete}
                              action={() => handleDeleteContent(content)}
                              type="danger"
                              title="Hapus Data !"
                              description="Data akan dihapus permanen. Yakin ingin menghapus data ini?"
                              textSubmit="Hapus"
                              textCancel="Batal"
                            >
                              <div>
                                <TrashCan />
                              </div>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="my-3 flex justify-center">
                  <Pagination
                    currentPage={data?.pagination?.current_page}
                    lastPage={totalPages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Notification
        title={isSuccess ? "Sukses !" : "Gagal !"}
        description={
          isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
        }
        open={isSuccess || isError}
        type={isSuccess ? "success" : "error"}
      />
    </ProtectedLayout>
  );
}