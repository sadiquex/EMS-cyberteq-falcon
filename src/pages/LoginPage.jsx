import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center flex-col gap-4">
      <h2 className="text-lg">Login to your account</h2>

      {/* login form */}
      <form className="max-w-sm mx-auto p-6 w-[500px] bg-gray-50 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your email
          </label>
          <input
            type="email"
            placeholder="e.g; abubakasaddik1@email.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your password
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
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
          <Link to="/employee/dashbard">
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">
              Login as Employee
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
