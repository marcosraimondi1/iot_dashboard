"use client";
import Dash from "../Components/Dashboard/Dashboard";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Dashboard({ children }) {
  const onLogout = () => {
    document.location.href = "/api/auth/logout";
  };

  return (
    <Dash logout={onLogout} title="IOT CENTER">
      {children}
    </Dash>
  );
});
