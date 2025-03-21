import React, { useState } from "react";
import Button from "./Button";

function Users() {
  const dummyData = [
    { username: "Pandu", firstname: "Pandu", lastname: "Param", _id: 1 },
  ];
  const [users, setUsers] = useState(dummyData);

  return (
    <>
      <div className="font-bold text-lg mt-6">Users</div>
      <div className="mt-3 ">
        <input
          type="text"
          placeholder="Search"
          className="w-full text-md border border-slate-300 px-2 py-1 rounded-md"
        />
      </div>
      <div className="w-full">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  console.log(user);
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
          <Button label={"Send Money"} onClick={() => {}} />
        </div>
      </div>
    </>
  );
}

export default Users;
