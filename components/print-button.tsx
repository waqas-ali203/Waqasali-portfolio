"use client";
import { Printer } from "lucide-react";
export function PrintButton() {
  return (
    <button className="resume-print" onClick={() => window.print()}>
      <Printer size={16} /> Print resume
    </button>
  );
}
