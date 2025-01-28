import TableDetail from "@/components/molecules/TableDetail";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Detail({}: Props) {
  const [user, setUser] = useState({ email: "" });

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

  return (
    <main className="flex items-center justify-center px-2 mx-auto lg:px-10">
      <div className="flex flex-col justify-center w-full px-5 py-10 mx-auto rounded-lg table-calon-staff">
        <h1 className="text-xl font-semibold lg:text-2xl text-slate-200">Calon Staff</h1>
        <TableDetail />
      </div>
    </main>
  );
}
