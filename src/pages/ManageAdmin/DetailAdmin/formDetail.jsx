import { Input } from "@/components/ui/input";
import DefaultPhoto from "@/assets/default-photo.svg";
import { Label } from "@/components/ui/label";
import Visibility from "@/components/icons/Visibility";
import { getAdminById } from "@/services/manageAdmin/getAdminById";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ReadOnlyField } from "@/components/ui/read-only-field";

export const useGetAdminId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token); // Mengambil token dari Redux state
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: () => getAdminById(token, id),
    enabled: !!token,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });
  return { data, error, isLoading };
};

export const FormDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetAdminId(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-5 sm:gap-10">
      <div className="grid h-fit w-full items-center gap-5 overflow-hidden rounded-[10px] border-none bg-neutral-50 px-6 py-8 shadow-md sm:flex sm:gap-10 sm:py-[132px]">
        <div className="mx-auto w-fit rounded-full bg-neutral-200 sm:w-[212px]">
          <img
            className="h-[180px] w-[180px] rounded-full sm:h-[212px] sm:w-[212px]"
            src={data?.data?.foto_profil || DefaultPhoto}
            alt="photo"
          />
        </div>
        <form action="" className="mx-auto flex w-full flex-1 flex-col gap-10">
          <div className="flex w-full gap-10">
            <div className="grid w-full gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="username"
                  className="font-jakarta-sans text-sm font-bold text-neutral-900"
                >
                  Username
                </Label>
              </div>
              <div className="w-full">
                <Input
                  className=" border-solid-1 rounded-[10px] bg-white px-[12px] py-5 font-jakarta-sans text-sm font-normal text-neutral-700"
                  id="username"
                  type="text"
                  required
                  placeholder="Masukan nama admin"
                />
              </div>
            </div>
          </div>
          <div className="grid w-full gap-2">
            <div className="flex items-center">
              <Label
                htmlFor="date"
                className="font-jakarta-sans text-sm font-bold text-neutral-900"
              >
                Tanggal Pembuatan
              </Label>
            </div>
            <div className="w-full">
              <Input
                className=" border-solid-1 rounded-[10px] bg-white px-[12px] py-5 font-jakarta-sans text-sm font-normal text-neutral-700"
                id="date"
                type="text"
                value={data?.data?.tanggal_pembuatan}
                required
                placeholder="Tanggal Pembuatan"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
