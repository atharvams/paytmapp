import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + searchText, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        console.log(response.data.users);
        setUsers(response.data.users);
      });
  }, [searchText]);

  return (
    <>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="mt-3 ">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="w-full text-md border border-slate-300 px-2 py-1 rounded-md"
        />
      </div>
      <div className="w-full">
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between mt-2">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstname[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
            <div>
              {user.firstname} {user.lastname}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-ful">
          <Button
            label={"Send Money"}
            onClick={() => {
              navigate("/send?id=" + user.id + "&firstname=" + user.firstname);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Users;
