import { PersonIcon } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";

export const TotalRoute = ({ filteredData, isLoading }) => {
  return (
    <div className="items-left col-span-4 flex flex-col justify-center rounded-lg bg-neutral-50 p-4 lg:col-span-2">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-10 w-full rounded-lg bg-neutral-200" />
            <Skeleton className="h-5 w-full rounded-lg bg-neutral-200" />
          </div>
        </div>
      ) : (
        <div>
          <PersonIcon className="mb-4 h-6 w-6" />
          <p className="font-jakarta-sans text-[26px] font-[700] text-neutral-800">
            {filteredData}
          </p>
          <p className="font-jakarta-sans text-[16px] font-[400] text-neutral-800">
            Total Rute
          </p>
        </div>
      )}
    </div>
  );
};
