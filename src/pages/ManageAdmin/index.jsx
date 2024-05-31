import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Success from "@/assets/ImgModal/success.svg";
import IcAdmin from "@/components/icons/ic-admin.svg";
import IcSearch from "@/components/icons/ic-search.svg";
import IcAdd from "@/components/icons/ic-add.svg";
import IcEdit from "@/components/icons/ic-edit.svg";
import IcDelete from "@/components/icons/ic-delete.svg";
import Navbar from "@/components/layout/navbar-admin";
import { DataAdmin } from "@/constant/DataAdmin";


export default function DisplayAdmin() {
  return (
    <main>
      <Navbar></Navbar>
      <section className="container mx-auto flex h-[3000px] flex-col gap-5 bg-slate-200 py-40">
        <div className="flex h-fit items-center justify-between gap-4">
          <div className="h-fit w-full overflow-hidden rounded-[10px] border-none shadow-md">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="flex flex-col gap-4 bg-neutral-50 px-4"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-[26px] font-bold text-neutral-800">
                  Kelola Admin
                </CardTitle>
                <CardDescription className="text-[16px] font-medium text-neutral-700">
                  Kelola data admin dengan mudah!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex w-[400px] items-center gap-2 overflow-hidden rounded-[12px] border border-neutral-200 px-4 py-1">
                    <img src={IcSearch} sizes="24" alt="" />
                    <Input
                      type="text"
                      placeholder="Cari..."
                      className="h-fit border-none bg-transparent text-[14px] font-normal text-neutral-800 outline-none"
                    />
                  </div>
                  <div>
                    <Button className="text-primary-500 flex items-center gap-4 overflow-hidden rounded-[12px] border border-neutral-300 bg-transparent px-4  py-6 shadow-sm hover:bg-neutral-100">
                      <img src={IcAdd} sizes="24" alt="" />
                      <span>Tambah Admin</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-[218px] overflow-hidden rounded-[10px] border-none shadow-md">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className="flex w-full flex-col gap-4 bg-neutral-50 px-4 py-4"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  <img src={IcAdmin} sizes="24" alt="" />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-semibold text-neutral-900">
                  10
                </CardTitle>
                <div className="text-muted-foreground text-[16px] font-normal text-neutral-900">
                  Total Admin
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-neutral-50 shadow-md">
          <Table className="w-full">
            <TableHeader className="bg-primary-500 font-jakarta-sans text-sm font-semibold text-neutral-50 sm:w-full">
              <TableRow className="text-neutral-50 sm:max-w-full">
                <TableHead className="w-[459px]">Username</TableHead>
                <TableHead className="w-[459px]">Tanggal Pembuatan</TableHead>
                <TableHead className="w-[200px] text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DataAdmin.map((item) => (
                <TableRow
                  className="font-jakarta-sans w-full text-sm font-normal text-neutral-800"
                  key={item.id}
                >
                  <TableCell className="w-[459px]">{item.username}</TableCell>
                  <TableCell className="w-[459px]">{item.date}</TableCell>
                  <TableCell className="flex w-full items-center justify-center gap-7 px-0">
                    <div>
                      <img src={IcEdit} sizes="24" alt="" />
                    </div>
                    <div>
                      <img src={IcDelete} sizes="24" alt="" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <AlertDialog className="rounded bg-white">
          <AlertDialogTrigger asChild className="sm:rounded">
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex h-[365px] w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
            <AlertDialogHeader className="flex flex-col gap-4">
              <AlertDialogHeader className="flex items-center justify-center">
                <img className="h-[100px] w-[240px]" src={Success} alt="" />
              </AlertDialogHeader>
              <AlertDialogTitle className="font-jakarta-sans text-center text-lg font-bold">
                Tambah Admin?
              </AlertDialogTitle>
              <AlertDialogDescription className="font-jakarta-sans w-full text-center text-sm font-medium text-neutral-600">
                Sebelum menambahkan admin, pastikan informasi yang dimasukkan
                benar dan sesuai. Apakah Anda yakin ingin menambahkan data ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
              <AlertDialogCancel className="border-primary-500 text-primary-500 hover:text-primary-500 h-[42px] w-full text-[16px] font-medium sm:rounded-[12px]">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction className="bg-primary-500 hover:bg-primary-600 h-[42px] w-full text-[16px] font-medium text-neutral-100 sm:rounded-[12px]">
                Tambah
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </main>
  );
}
