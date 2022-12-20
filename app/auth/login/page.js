"use client";
import SignIn from "../../Components/SignIn/SignIn";

export default function Login() {
  const onLogin = (user) => {
    console.table(user);
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
}
