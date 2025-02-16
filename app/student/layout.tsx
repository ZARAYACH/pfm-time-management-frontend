import React from "react";
import DashboardHeader from "@components/header/DashboardHeader";
import {Nabla} from "next/dist/compiled/@next/font/dist/google";
import NavBar from "@/app/student/NavBar";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex h-full bg-gray-50">
      <NavBar/>
      <div className="w-full">
        <DashboardHeader/>
        <main className="p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
    ;
}