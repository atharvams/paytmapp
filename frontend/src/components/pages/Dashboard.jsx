import React from "react";
import Appbar from "../ui/Appbar";
import Balance from "../ui/Balance";
import Users from "../ui/Users";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
        <Users/>
      </div>
    </div>
  );
}

export default Dashboard;
