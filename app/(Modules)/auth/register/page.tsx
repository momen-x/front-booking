import React from "react";
import { RegisterForm } from "./_Components/register-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register",
};
const RegisterPage = () => {
  //todo starting deal with abi (back end)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        marginTop: "5rem",
      }}
    >
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
