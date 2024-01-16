import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center flex-col ">
      <h2 className="text-lg">Login to your account</h2>

      {/* login form */}
      <form className="w-auto max-w-sm mx-auto p-6 bg-gray-50 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
            <input
              id="email"
              type="email"
              placeholder="e.g; abubakasaddik1@email.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            />
          </label>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
            <input
              id="password"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </label>
        </div>

        <div className="flex justify-between gap-2">
          <Link to="/admin/dashboard">
            <button
              // type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
            >
              Login as admin
            </button>
          </Link>
          {/* user login */}
          <Link to="/employee/complete-profile">
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">
              Login as Employee
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
