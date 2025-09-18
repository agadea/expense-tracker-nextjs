"use client";

import { useRef } from "react";
import { toast } from "react-toastify";
import { registerAction } from "../actions/registerAction";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await registerAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Registration successful");
      formRef.current?.reset();
    }
  };

  return (
    <div className="auth-form">
      <h1>Register</h1>
      <form ref={formRef} action={clientAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
