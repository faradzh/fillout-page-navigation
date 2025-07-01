"use client";

import Navigation from "./components/Navigation";
import { Info, FileText, CircleCheck } from "lucide-react";

const PAGES = [
  { id: "2bj124bj124bj", title: "Info", icon: Info },
  { id: "b12jk5bkj12b5", title: "Details", icon: FileText },
  { id: "b512kj5b1k5bb", title: "Other", icon: "" },
  { id: "bj23k6gekb6jj", title: "Ending", icon: CircleCheck },
  { id: "bj2jb635kb65j", title: "Last", icon: CircleCheck },
];

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20] text-sm">
      <Navigation pages={PAGES} />
    </div>
  );
}
