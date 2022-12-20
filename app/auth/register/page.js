"use client";
import SignUp from "../../Components/SignUp/SignUp";

export default function Register() {
  const onRegister = (user) => {
    console.table(user);
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
}
