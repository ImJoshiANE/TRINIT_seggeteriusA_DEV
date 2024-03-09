import { Outlet } from "react-router-dom";

import Classes from "@/components/dashboard/Classes";
import FlashCards from "@/components/dashboard/FlashCards";
import Profile from "@/components/dashboard/Profile";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2 bg-primary text-white flex items-start justify-center pt-20 w-[100%]">
        <Sidebar user={false} />
      </div>
      <div className="col-span-10 flex flex-col justify-start items-center bg-destructive-foreground">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
