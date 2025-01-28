import { collection, doc, getDoc, getDocs, or, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";

type CalonStaff = {
  id: string;
  name: string;
  nim: string;
  email: string;
  classStudent: string;
  generation: string;
  divisions: string[];
  status: string;
  whatsappNumber: string;
  address: string;
  campusDomicile: string;
  isAgree: boolean;
  linkTwibbon?: string;
  reasonDivision1?: string;
  reasonDivision2?: string;
  reasonHMIF?: string;
  idLine?: string;
};

export const fetchCalonStaffDashboard = async (): Promise<CalonStaff[]> => {
  try {
    const snapshot = await getDocs(collection(db, "calonStaff"));
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name || "Unknown",
        nim: data.nim || "Unknown",
        email: data.email || "",
        classStudent: data.classStudent || "",
        generation: data.generation || "",
        divisions: Array.isArray(data.divisions) ? data.divisions : [],
        status: data.status || "Unknown",
        whatsappNumber: data.whatsappNumber || "",
        address: data.address || "",
        campusDomicile: data.campusDomicile || "",
        isAgree: data.isAgree ?? false,
        linkTwibbon: data.linkTwibbon || undefined,
        reasonDivision1: data.reasonDivision1 || undefined,
        reasonDivision2: data.reasonDivision2 || undefined,
        reasonHMIF: data.reasonHMIF || undefined,
        idLine: data.idLine || undefined,
      } as CalonStaff;
    });
  } catch (error) {
    console.error("Error fetching calon staff:", error);
    return [];
  }
};

export const segmentCalonStaff = (calonStaff: CalonStaff[]) => {
  const initialSegments = {
    global: 0,
    accept: 0,
    akademik: 0,
    administrasi: 0,
    kastrad: 0,
    kwu: 0,
    kominfo: 0,
    pmb: 0,
    psdm: 0,
  };

  return calonStaff.reduce((segments, staff) => {
    // Increment global count
    segments.global += 1;

    // Check if staff is accepted
    if (staff.status === "Diterima") {
      segments.accept += 1;
    }

    // Handle divisions segmentation safely
    staff.divisions.forEach((division) => {
      if (division.includes("Akademik")) segments.akademik += 1;
      if (division.includes("Administrasi")) segments.administrasi += 1;
      if (division.includes("Kastrad")) segments.kastrad += 1;
      if (division.includes("KWU")) segments.kwu += 1;
      if (division.includes("KOMINFO")) segments.kominfo += 1;
      if (division.includes("PMB")) segments.pmb += 1;
      if (division.includes("PSDM")) segments.psdm += 1;
    });

    return segments;
  }, initialSegments);
};

export async function fetchCalonStaff(dinasName?: string) {
  if (dinasName === "akademik") {
    return getCalonStaffAkademik();
  }
  if (dinasName === "administrasi") {
    return getCalonStaffAdministrasi();
  }
  if (dinasName === "kastrad") {
    return getCalonStaffKastrad();
  }

  if (dinasName === "kwu") {
    return getCalonStaffKWU();
  }

  if (dinasName === "kominfo") {
    return getCalonStaffKominfo();
  }
  if (dinasName === "pmb") {
    return getCalonStaffPMB();
  }
  if (dinasName === "psdm") {
    return getCalonStaffPSDM();
  }
  if (dinasName === "diterima") {
    return getStaffDiterima();
  }

  return getAllCalonStaff();
}

async function getStaffDiterima() {
  try {
    const calonStaffRef = collection(db, "calonStaff");

    const staffDiterimaQuery = query(calonStaffRef, where("status", "==", "Diterima"), orderBy("name", "asc"));

    console.log("Query dibuat, memuat data...");
    const querySnapshot = await getDocs(staffDiterimaQuery);

    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return calonStaffRes;
  } catch (error) {
    console.error("Error saat mendapatkan staff diterima:", error);
  }
}

export async function getAllCalonStaff() {
  try {
    const calonStaffRef = collection(db, "calonStaff");
    const calonStaffQuery = query(calonStaffRef, orderBy("name", "asc"));
    const calonStaffDocs = await getDocs(calonStaffQuery);
    const calonStaffRes = calonStaffDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

export async function getCalonStaffById(id: string) {
  try {
    const calonStafRef = doc(db, "calonStaff", id);
    const calonStaffSnap = await getDoc(calonStafRef);

    return calonStaffSnap.data();
  } catch (error) {
    console.log(error);
  }
}

async function getCalonStaffAkademik() {
  try {
    const calonStaffRef = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffRef, or(where("divisions", "array-contains", "Akademik - PTI"), where("divisions", "array-contains", "Akademik - PIP")), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return calonStaffRes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getCalonStaffAdministrasi() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, where("divisions", "array-contains", "Administrasi"), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

async function getCalonStaffPSDM() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, where("divisions", "array-contains", "PSDM"), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

async function getCalonStaffKastrad() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, or(where("divisions", "array-contains", "Kastrad - ADKAM"), where("divisions", "array-contains", "Kastrad - POLPRO")), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

async function getCalonStaffKWU() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, where("divisions", "array-contains", "KWU"), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

async function getCalonStaffKominfo() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, or(where("divisions", "array-contains", "KOMINFO - HUMAS"), where("divisions", "array-contains", "KOMINFO - MULMED")), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}

export async function getCalonStaffPMB() {
  try {
    const calonStaffCollection = collection(db, "calonStaff");
    const calonStaffAkademikQuery = query(calonStaffCollection, or(where("divisions", "array-contains", "PMB - Olahraga"), where("divisions", "array-contains", "PMB - Seni")), orderBy("name", "asc"));

    const querySnapshot = await getDocs(calonStaffAkademikQuery);
    const calonStaffRes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return calonStaffRes;
  } catch (error) {
    console.log(error);
  }
}
