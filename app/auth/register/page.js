"use client";

import SignUp from "../../Components/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { register } from "@/Slices/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const onRegister = (user) => {
    dispatch(register(user));
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
}
