"use client";
import axios from "axios";
import SignUp from "../../Components/SignUp/SignUp";
import notAuthenticated from "middleware/notAuthenticated";
import { useDispatch } from "react-redux";
import { register } from "@/Slices/authSlice";

export default notAuthenticated(function Register() {
  const dispatch = useDispatch();

  const onRegister = (user) => {
    console.table(user);
    dispatch(register(user));
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
});
