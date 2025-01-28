"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCalonStaff } from "@/lib/api";

export default function TableCalonStaff() {
  const [calonStaff, setCalonStaff] = useState<any>([]);
  const [filteredStaff, setFilteredStaff] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dinasName = usePathname().split("/")[2];

  useEffect(() => {
    const getCalonStaff = async () => {
      if (dinasName) {
        const response = await fetchCalonStaff(dinasName);
        setCalonStaff(response);
        setFilteredStaff(response);
      }
    };
    getCalonStaff();
  }, [dinasName]);

  useEffect(() => {
    const results = calonStaff.filter((staff: any) => staff.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredStaff(results);
  }, [searchQuery, calonStaff]);

  const isAccepted = dinasName === "diterima";

  return (
    <div className="mx-auto my-5 w-full">
      <div className="flex justify-between items-center mb-8 mx-6">
        <h1 className="text-xl font-semibold lg:text-2xl text-slate-200 capitalize">{isAccepted ? "Staf Diterima" : dinasName == "pendaftar" ? "Calon Staf" : `Calon Staf - Dinas ${dinasName}`}</h1>
        <input type="text" placeholder="Cari nama staf..." className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead colSpan={10}>NIM</TableHead>
            <TableHead colSpan={14}>Divisi 1</TableHead>
            <TableHead colSpan={15}>Divisi 2</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStaff && filteredStaff.length > 0 ? (
            filteredStaff.map((staff: any, index: number) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell colSpan={10}>{staff.nim}</TableCell>
                <TableCell colSpan={14}>{staff.divisions[0]}</TableCell>
                <TableCell colSpan={14}>{staff.divisions[1]}</TableCell>
                <TableCell colSpan={14}>
                  <Link href={`/dashboard/${dinasName}/${staff.id}`} className="px-5 py-1 rounded-lg cursor-pointer bg-emerald-600 text-white">
                    Detail
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={100} className="text-center font-medium">
                {isAccepted ? "Belum ada staf yang diterima." : dinasName == "pendaftar" ? "Belum ada calon staf yang mendaftar." : `Belum ada calon staf yang mendaftar di dinas ${dinasName}.`}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
