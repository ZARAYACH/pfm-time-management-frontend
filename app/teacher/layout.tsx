import React from "react";
import DashboardHeader from "@components/header/DashboardHeader";
import NavBar from "@/app/teacher/NavBar";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex h-full bg-gray-50">
      <NavBar />
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