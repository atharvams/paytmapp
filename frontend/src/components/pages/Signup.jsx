import React from "react";
import Input from "../ui/Input";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Button from "../ui/Button";

function Signup() {
  return (
    <div>
      <Title title={"Signup"}/>
      <Subtitle text={"Enter your info to create account!"}/>
      <Input placeholder={"John"} label={"First Name"} />
      <Button onClick={()=>{}} label={"Submit"} />
    </div>
  );
}

export default Signup;
