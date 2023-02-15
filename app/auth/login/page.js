"use client";
import SignIn from "../../Components/SignIn/SignIn";
import notAuthenticated from "middleware/notAuthenticated";
import { useDispatch } from "react-redux";
import { login } from "@/Slices/authSlice";

export default notAuthenticated(function Login() {
  const dispatch = useDispatch();
  const onLogin = (user) => {
    dispatch(login(user));
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
});

// const Cookie = process.client ? require("js-cookie") : undefined;
