import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/features/UserSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Spinner } from "../components/_ui/Spinner";

const formFields = [
  {
    name: "email",
    label: "Your email",
    type: "email",
    placeholder: "e.g; abubakasaddik1@email.com",
  },
  {
    name: "password",
    label: "Your password",
    type: "password",
  },
];

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // state to handle invalid credeitials
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await API.post("/Users/login", data);
      if (response.status === 200) {
        // console.log("Login successful:", response.data);
        toast.success("Login successful");

        // check role here and display page accordingly
        const decodedToken = jwtDecode(response.data.result.token);
        const role = decodedToken.role;
        console.log(response.data.result.token);
        // localStorage.setItem("userToken", response.data.result.token);
        // send data to user state
        dispatch(updateUserDetails(response.data.result.user));
        dispatch(updateUserDetails(decodedToken));

        // role based routing
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/employee/complete-profile");
        } else if (role === "manager") {
          alert("this is a manager role");
        } else {
          alert("invalid role: " + role);
        }
      } else if (response.status === 400) {
        toast.error("bad request " + response);
        // setInvalidCredentials(true);
      }
    } catch (error) {
      console.log("Error during login:", error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center rounded-lg px-3 md:px-0 bg-primaryColor">
      {/* login form and image */}
      <div className="flex flex-1 gap-4 flex-col md:flex-row md:max-w-[60%] h-auto  mx-auto bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* image */}
        <div
          className="flex-1 relative md:flex flex-col justify-center items-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/realistic-white-golden-geometric-background_79603-2032.jpg?w=740&t=st=1705665643~exp=1705666243~hmac=3550ee53ba53d54b2624727e1180a2d6f70462e149c391cba6a2e405aa262fdf",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full p-3 flex items-center justify-center flex-col gap-2 md:w-[80%] text-center">
            <div className="flex gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfENhWL2HQ94B7blfq80PYtLRs2Kf1XJLkNd9Y32n-GA4NndBDBbBpJ6SPiPKWI_8vbAc&usqp=CAU"
                alt="logo"
                className="w-[80px] h-[80px] object-cover rounded-full"
              />
              <img
                src="https://media.licdn.com/dms/image/C4E0BAQEesPIaxnBiAg/company-logo_200_200/0/1677239200791?e=2147483647&v=beta&t=oX4AuTtqmATxNQuPJJvZNdnJZqJxROJFQV4Tyd7n3Lg"
                alt="logo"
                className="w-[80px] h-[80px] object-cover rounded-full animate-bounce"
              />
            </div>

            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-lg">
              Manage your leave, lunch and conference room bookings!
            </p>
          </div>
        </div>
        {/* login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {loading && <Spinner />}

          <h1 className="text-xl mb-4 font-bold whitespace-normal">
            Login to your account
          </h1>

          {formFields.map((field, i) => (
            <div className="mb-6" key={i}>
              <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
                {field.label}
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  name={field.name}
                  {...register(field.name, {
                    required: "This field is required",
                  })}
                />
                {errors[field.name]?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </label>
            </div>
          ))}

          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="text-primaryColor bg-secondaryColor hover:brightness-125 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>

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
