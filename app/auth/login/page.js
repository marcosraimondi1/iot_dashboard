"use client";
import SignIn from "../../Components/SignIn/SignIn";
import notAuthenticated from "middleware/notAuthenticated";

export default notAuthenticated(function Login() {
  const onLogin = (user) => {
    console.table(user);
  };

  return <SignIn submit={onLogin} registerLink="/auth/register" />;
});
