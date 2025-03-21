import React, { useEffect, useState } from "react";
import axios from "axios";

const Appbar = () => {
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        setFirstname(response.data.firstname);
      });
  }, []);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 font-semibold text-xl">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {firstname}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstname[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
