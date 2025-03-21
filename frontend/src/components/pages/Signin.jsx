import React, { useState } from "react";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Input from "../ui/Input";
import Button from "../ui/Button";
import BottomWarning from "../ui/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signinHandler = async () => {
    await axios
      .post("http://localhost:3000/api/v1/user/signin", {
        username: email,
        password,
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("Token", response.data.token);
        } else {
          console.error("sign in error!");
        }
      });
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4 ">
          <Title title={"Sign in"} />
          <Subtitle
            text={"Enter your information to signin to your account!"}
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
            <Button onClick={signinHandler} label={"Submit"} />
          </div>
          <BottomWarning
            label={"Aready have an account"}
            buttonText={"Signup"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
