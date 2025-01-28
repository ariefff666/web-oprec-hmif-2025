"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCalonStaff, getCalonStaffById } from "@/lib/api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { Button } from "../ui/button";
import { store } from "next/dist/build/output/store";

export default function TableDetail() {
  const [kpmUrl, setKpmUrl] = useState("");
  const [calonStaff, setCalonStaff] = useState<any>({});
  const [accepted, setAccepted] = useState(false);
  const calonStaffId = usePathname().split("/")[3];

  useEffect(() => {
    const getCalonStaff = async () => {
      if (calonStaffId) {
        const response = await getCalonStaffById(calonStaffId);
        setCalonStaff(response);

        if (response?.status === "Diterima") {
          setAccepted(true);
        } else {
          setAccepted(false);
        }
      }
    };
    getCalonStaff();

    const getCalonStaffKPM = async () => {
      if (calonStaff.nim) {
        const url = await getDownloadURL(ref(storage, `calonStaff/${calonStaff.nim}`));
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        const img = document.getElementById("myimg");
        img?.setAttribute("src", url);
        setKpmUrl(kpmUrl);
      }
    };
    getCalonStaffKPM();
  }, [calonStaff]);

  const handleAccept = async () => {
    try {
      const newStatus = !accepted ? "Diterima" : "Belum Diterima";
      setAccepted(!accepted);

      const docRef = doc(db, "calonStaff", calonStaffId);
      await updateDoc(docRef, { status: newStatus });

      console.log(`Status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Table className="w-full mx-auto my-5">
      <TableBody className="text-xl md:text-2xl">
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Nama
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.name}</TableCell>
        </TableRow>

        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            NIM
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.nim}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Angkatan
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.generation}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Kelas
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.classStudent}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Email
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.email}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Domisili Kampus
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.campusDomicile}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Alamat
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.address}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            No Whatsapp
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.whatsappNumber}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            ID Line
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.idLine}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Divisi 1
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff?.divisions?.at(0)}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Divisi 2
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff?.divisions?.at(1)}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Alasan masuk HMIF
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.reasonHMIF}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Alasan memilih divisi 1
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.reasonDivision1}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Alasan memilih divisi 2
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">{calonStaff.reasonDivision2}</TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            Link postingan Twibbon
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">
            <a href={calonStaff.linkTwibbon} className="text-sky-400">
              {calonStaff.linkTwibbon}
            </a>
          </TableCell>
        </TableRow>
        <TableRow className="font-bold text-slate-100 ">
          <TableCell colSpan={10} className=" w-[200px] lg:w-[400px] font-bold">
            KPM
          </TableCell>
          <TableCell className="font-medium">:</TableCell>
          <TableCell className="font-medium">
            <img id="myimg" className="max-w-64 max-h-64" src={kpmUrl} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell colSpan={10} className="text-right pt-4">
            <Button onClick={handleAccept} className={`rounded-lg cursor-pointer text-lg ${accepted ? "bg-red-600" : "bg-emerald-600"}`}>
              {accepted ? "Hapus" : "Terima"}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
