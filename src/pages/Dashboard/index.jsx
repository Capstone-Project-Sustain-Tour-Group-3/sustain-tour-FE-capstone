import AreaChartComponents from "@/components/AreaChart";
import { PeopleAltIcon, PersonIcon, AltRouteIcon } from "@/assets/icons";

export default function DashboardPage() {
  return (
    <div className="flex border border-black">
      <div className="w-[240px]">aa</div>

      <div className="flex w-full flex-col gap-4 bg-primary-50 p-6 font-sans">
        <h1 className="text-xl font-bold text-neutral-800">Overview</h1>
        <div className="flex gap-10">
          <div className="w-4/6 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4">
                <PeopleAltIcon />
                <div className="text-neutral-100">
                  <h1 className="text-2xl font-semibold">10</h1>
                  <p>Total Admin</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-[10px] border border-primary-500 bg-neutral-50 p-4">
                <PersonIcon />
                <div className="text-primary-700">
                  <h1 className="text-2xl font-semibold">894</h1>
                  <p>Total Pengguna</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-[10px] bg-primary-500 p-4">
                <PeopleAltIcon />
                <div className="text-neutral-100">
                  <h1 className="text-2xl font-semibold">10</h1>
                  <p>Total Admin</p>
                </div>
              </div>
            </div>
            <div className="border border-black bg-[#FAFAFA] rounded-xl">
              <div className="flex items-center justify-between px-4 py-4">
                <h1 className="text-lg font-bold text-neutral-800">
                  Grafik Pertumbuhan Pengguna
                </h1>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-primary-400" />
                    <p className=" text-sm font-medium text-neutral-900">
                      Total Pengguna
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-secondary-400" />
                    <p className=" text-sm font-medium text-neutral-900">
                      Pengguna Baru
                    </p>
                  </div>
                </div>
              </div>
              <AreaChartComponents width="100%" height={250} />
            </div>
          </div>
          <div className="border border-black">a</div>
        </div>
      </div>
    </div>
  );
}
