import React from "react";
import LoginForm from "./_Components/login";
import { Card, CardHeader } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="w-screen flex justify-center items-center mt-8">
      <Card className="w-[28%] border">
        <CardHeader>
          <h1>Welcome Back!</h1>
          <p>Login to your account to continue</p>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
