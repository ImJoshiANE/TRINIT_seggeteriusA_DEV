import Classes from "@/components/dashboard/Classes";
import FlashCards from "@/components/dashboard/FlashCards";
import Profile from "@/components/dashboard/Profile";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-2 bg-primary text-white flex items-start justify-center pt-20">
        <Sidebar />
      </div>
      <div className="col-span-10 flex flex-col justify-start items-center bg-destructive-foreground">
        {/* <Profile /> */}
        {/* <Classes/> */}
          <FlashCards/>
      </div>
    </div>
  );
};

export default UserDashboard;
