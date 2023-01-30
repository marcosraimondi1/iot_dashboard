"use client";
import SignUp from "../../Components/SignUp/SignUp";
import notAuthenticated from "middleware/notAuthenticated";

export default notAuthenticated(function Register() {
  const onRegister = (user) => {
    console.table(user);
  };
  return <SignUp submit={onRegister} loginLink="/auth/login" />;
});
