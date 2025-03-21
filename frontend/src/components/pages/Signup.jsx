import React, { useState } from "react";
import Input from "../ui/Input";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";
import axios from "axios";

function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4 ">
          <Title title={"Sign up"} />
          <Subtitle text={"Enter your information to create your account!"} />
          <Input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"John"}
            label={"First Name"}
          />
          <Input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Wick"}
            label={"Last Name"}
          />
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"john.wick@gmail.com"}
            label={"Email"}
          />
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"John@wick2009"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:3000/api/v1/user/signup", {
                    username: email,
                    password,
                    firstname,
                    lastname,
                  })
                  .then((response) =>
                    localStorage.setItem(token, response.data.token)
                  );
              }}
              label={"Submit"}
            />
          </div>
          <BottomWarning
            label={"Aready have an account?"}
            buttonText={"SignIn"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
