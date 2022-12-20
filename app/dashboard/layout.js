"use client";
import Dash from "../Components/Dashboard/Dashboard";

export default function Dashboard({ children }) {
  const onLogout = () => {
    // global.notify("Adios!", { variant: "success" });
  };
  return (
    <Dash logout={onLogout} title="IOT CENTER">
      {children}
    </Dash>
  );
}
