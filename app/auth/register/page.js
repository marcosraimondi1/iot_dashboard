"use client";

import SignUp from "../../Components/SignUp/SignUp";
import notAuthenticated from "middleware/notAuthenticated";
import { useDispatch } from "react-redux";
import { register } from "@/Slices/authSlice";

export default notAuthenticated(function Register() {
  const dispatch = useDispatch();
  const onRegister = (user) => {
    dispatch(register(user));
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
});
