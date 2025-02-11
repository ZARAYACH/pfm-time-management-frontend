import React from "react";
import DashboardNavBar from "@components/common/DashboardNavBar";
import DashboardHeader from "@components/header/DashboardHeader";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

  return (
    <div className="flex h-full bg-gray-50">
      <DashboardNavBar/>
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