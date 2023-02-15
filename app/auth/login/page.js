"use client";
import SignIn from "../../Components/SignIn/SignIn";
import { useDispatch } from "react-redux";
import { login } from "@/Slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const onLogin = (user) => {
    dispatch(login(user));
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
}

// const Cookie = process.client ? require("js-cookie") : undefined;
