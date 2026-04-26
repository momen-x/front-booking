import React from "react";
import { RegisterForm } from "./_Components/register-form";

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
