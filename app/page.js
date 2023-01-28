import Link from "next/Link";

export default function App() {
  return (
    <>
      <h1>App</h1>
      <Link href="/dashboard">Dashboard</Link>
      <a href="/api/auth/login">Login with AUTHO</a>
      <Link href="/auth/login">Login</Link>
    </>
  );
}
