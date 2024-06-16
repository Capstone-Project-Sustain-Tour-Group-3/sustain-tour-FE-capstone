import React from 'react';
import {useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import SideBar from "@/components/layout/sidebar";
import HeaderAdmin from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserById } from '@/services/manageUser/getUserById';

const useGetUserId = (id) => {
  const token = useSelector((state) => state.auth.user?.access_token);
  console.log("Token: ", token);  // Log the token to ensure it is being retrieved correctly
  
  const { data, error, isLoading } = useQuery( {
    queryKey: ["user",id],
    queryFn: () => getUserById(token, id),
    enabled: !!token && !!id,
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  return { data, error, isLoading };
};

export default function UserDetail() {
  const loc = useLocation();
  const {id} = useParams()
  console.log("User ID: ", id);  // Log the ID to ensure it is being retrieved correctly
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUserId(id);
  console.log("User Data: ", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data.data;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-col px-10 py-6 bg-primary-50 h-full">
          <div className="bg-neutral-50 shadow-md p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-[26px] font-bold text-neutral-800 font-jakarta-sans">Detail User</h1>
                <p className="text-base font-medium text-neutral-700 font-jakarta-sans">Lihat detail data pengguna</p>
              </div>
              <Button
                className="bg-primary-500 text-white text-[14px] font-medium font-jakarta-sans"
                onClick={() => navigate('/manage-user')}
              >
                Kembali
              </Button>
            </div>
          </div>
          <div className="bg-neutral-50 px-6 py-8 shadow-md rounded-lg grid grid-cols-12 gap-10">
            <div className="col-span-2 flex justify-center items-start">
              <Avatar className="w-44 h-44 ml-6">
                <AvatarImage src={user?.foto_profil || 'https://github.com/shadcn.png'} alt="User Photo" />
                {/* <AvatarFallback>UA</AvatarFallback> */}
              </Avatar>
            </div>
            <div className="col-span-10 grid grid-cols-12 gap-4">
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="username">Nama Pengguna</Label>
                <Input id="username" placeholder="Nama Pengguna" value={user?.username || ''} readOnly />
              </div>
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="fullname">Nama Lengkap</Label>
                <Input id="fullname" placeholder="Nama Lengkap" value={user?.nama_lengkap || ''} readOnly />
              </div>
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" value={user?.email || ''} readOnly />
              </div>
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" placeholder="Nomor Telepon" value={user?.no_telepon || ''} readOnly />
              </div>
              <div className="col-span-12 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                <Input id="jenis_kelamin" placeholder="Jenis Kelamin" value={user?.jenis_kelamin || ''} readOnly />
              </div>
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="city">Kota/Kabupaten</Label>
                <Input id="city" placeholder="Kota/Kabupaten" value={user?.kota || ''} readOnly />
              </div>
              <div className="col-span-6 mb-6">
                <Label className="text-sm font-bold font-jakarta-sans pb-2" htmlFor="province">Provinsi</Label>
                <Input id="province" placeholder="Provinsi" value={user?.provinsi || ''} readOnly />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
