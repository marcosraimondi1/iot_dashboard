"use client";
import SignIn from "../../Components/SignIn/SignIn";
import notAuthenticated from "middleware/notAuthenticated";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Slices/authSlice";

export default notAuthenticated(function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const onLogin = (user) => {
    dispatch(login(user));
    router.push("/dashboard");
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
});

// const Cookie = process.client ? require("js-cookie") : undefined;
