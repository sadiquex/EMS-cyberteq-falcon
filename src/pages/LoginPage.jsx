import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateUserDetails } from "../redux/employee-slices/employeeDetailsSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://cyberteq-falcon-api.onrender.com/api/Users/login",
        data,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // dispatch(updateUserDetails(response.data.result));

        navigate("employee/dashboard");
      } else {
        console.error("Login failed:", response.status, response);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-100 flex items-center justify-center flex-col ">
      <h2 className="text-lg">Login to your account</h2>

      {/* login form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-auto max-w-sm mx-auto p-6 bg-gray-50 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
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
              name="email"
              {...register("email")}
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )} */}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              name="password"
              {...register("password")}
            />
          </label>
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex gap-4 text-white">
        <button className="bg-blue-700 p-4">
          <Link to="/admin/dashboard">Admin</Link>
        </button>
        <button className="bg-blue-700 p-4">
          <Link to="/employee/complete-profile">Employee</Link>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
