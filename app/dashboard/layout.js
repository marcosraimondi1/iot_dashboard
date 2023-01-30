"use client";
import Dash from "../Components/Dashboard/Dashboard";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

import authenticated from "../../middleware/authenticated";
export default authenticated(function Dashboard({ children }) {
  const router = useRouter();
  const onLogout = () => {
    // router.push("/api/auth/logout");
    router.push("/auth/login");
  };

  return (
    <Dash logout={onLogout} title="IOT CENTER">
      {children}
    </Dash>
  );
});
