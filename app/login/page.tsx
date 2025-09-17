"use client";

import { useRef } from "react";
import { toast } from "react-toastify";

import "../auth.css";
import { loginAction } from "../actions/loginAction";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await loginAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Login successful");
      formRef.current?.reset();
    }
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="btn">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
