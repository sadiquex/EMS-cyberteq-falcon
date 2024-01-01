import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <div>LoginPage</div>
      <Link
        to="/dashboard"
        className="bg-primaryColor text-white p-3 rounded-full hover:brightness-110"
      >
        Login
      </Link>
    </div>
  );
}
