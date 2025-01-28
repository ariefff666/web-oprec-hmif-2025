"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";
import DinasCard from "@/components/atoms/DinasCard";
import { fetchCalonStaffDashboard, segmentCalonStaff } from "@/lib/api";

export default function Dashboard() {
  const [user, setUser] = useState({ email: "" });
  const [calonStaffLength, setCalonStaffLength] = useState({
    global: 0,
    accept: 0,
    akademik: 0,
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
        setUser({ email: user.email || "" });
      } else {
        router.push("/");
      }
    });
  }, [router]);

  useEffect(() => {
    // toast({
    //   title: "Dashboard sedang dalam maintenance",
    //   description: "Mohon maaf page dashboard OPREC HMIF UNSRI 2024 sedang dalam maintenance. Mohon menunggu beberapa saat lagi.",
    // });
    // router.push("/");

    const getCalonStaffData = async () => {
      try {
        const calonStaff = await fetchCalonStaffDashboard();
        const segmentedData = segmentCalonStaff(calonStaff);
        setCalonStaffLength(segmentedData);
      } catch (error) {
        console.error("Error fetching calon staff:", error);
        toast({
          title: "Error",
          description: "Gagal memuat data calon staff.",
          variant: "destructive",
        });
      }
    };

    getCalonStaffData();
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
