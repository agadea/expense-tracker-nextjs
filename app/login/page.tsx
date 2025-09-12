"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import "../auth.css";
import loginAction from "../actions/loginAction";

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
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
