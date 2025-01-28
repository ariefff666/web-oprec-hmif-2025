"use client";
import DinasCard from "@/components/atoms/DinasCard";
import { fetchCalonStaff } from "@/lib/api";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState({ email: "" });
  const [calonStaffLength, setCalonStaffLength] = useState<any>({
    global: 0,
    accept: 0,
    akademik: 101,
    administrasi: 0,
    kastrad: 0,
    kwu: 0,
    kominfo: 0,
    pmb: 0,
    psdm: 0,
  });

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email ? user.email : "" });
      } else {
        router.push("/");
      }
    });
  }, []);

  useEffect(() => {
    toast({
       title: "Pendafataran telah ditutup",
     description:
        "Mohon maaf pendaftaran OPREC HMIF UNSRI 2024 telah ditutup,terimakasih telah mendaftar,see u next year!!",
     });
     router.push("/");
    /*
    const getCalonStaff = async () => {
      const calonStaff = await Promise.all([
        fetchCalonStaff(),
        fetchCalonStaff("akademik"),
        fetchCalonStaff("administrasi"),
        fetchCalonStaff("kastrad"),
        fetchCalonStaff("kwu"),
        fetchCalonStaff("kominfo"),
        fetchCalonStaff("pmb"),
        fetchCalonStaff("psdm"),
        fetchCalonStaff("diterima"),
      ]);

      console.log("Fetched data:", calonStaff);

      setCalonStaffLength({
        global: calonStaff[0]?.length || 0,
        akademik: calonStaff[1]?.length || 0,
        administrasi: calonStaff[2]?.length || 0,
        kastrad: calonStaff[3]?.length || 0,
        kwu: calonStaff[4]?.length || 0,
        kominfo: calonStaff[5]?.length || 0,
        pmb: calonStaff[6]?.length || 0,
        psdm: calonStaff[7]?.length || 0,
        accept: calonStaff[8]?.length || 0,
      });
    };
    getCalonStaff();
    */
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 px-14">
      <DinasCard href="/dashboard/pendaftar" title="Pendaftar Total" registrant={calonStaffLength.global} iconBgColor="bg-sky-500" />
      <DinasCard href="/dashboard/diterima" title="Pendaftar Diterima" registrant={calonStaffLength.accept} iconBgColor="bg-amber-500" />
      <DinasCard href="/dashboard/administrasi" title="Administrasi" registrant={calonStaffLength.administrasi} iconBgColor="bg-lime-500" />
      <DinasCard href="/dashboard/akademik" title="Akademik Gacor" registrant={calonStaffLength.akademik} iconBgColor="bg-emerald-500" />
      <DinasCard href="/dashboard/kastrad" title="Kastrad" registrant={calonStaffLength.kastrad} iconBgColor="bg-cyan-500" />
      <DinasCard href="/dashboard/kwu" title="KWU" registrant={calonStaffLength.kwu} iconBgColor="bg-pink-500" />
      <DinasCard href="/dashboard/kominfo" title="Kominfo" registrant={calonStaffLength.kominfo} iconBgColor="bg-indigo-500" />
      <DinasCard href="/dashboard/pmb" title="PMB" registrant={calonStaffLength.pmb} iconBgColor="bg-purple-500" />
      <DinasCard href="/dashboard/psdm" title="PSDM" registrant={calonStaffLength.psdm} iconBgColor="bg-violet-500" />
    </div>
  );
}
