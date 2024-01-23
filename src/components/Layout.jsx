import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <p>layout component</p>
      <Outlet />
    </main>
  );
}
