import Link from "next/Link";
import Icon from "./Components/Icon/Icon";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          border: "3px solid #000",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px"
        }}
      >
        <Icon width="1.5em" height="2em" />
        <br />
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/auth/login">Login</Link>
        {/* <a href="/api/auth/login">Login</a> */}
      </div>
    </div>
  );
}
