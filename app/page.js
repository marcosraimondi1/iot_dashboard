import Link from "next/Link";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
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
          padding: "20px",
        }}
      >
        <h1>IoT Dashboard</h1>
        <Link href="/dashboard">Dashboard</Link>
        <a href="/api/auth/login">Login</a>
      </div>
    </div>
  );
}
