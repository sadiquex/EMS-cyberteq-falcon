import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../redux/features/UserSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Spinner } from "../components/_ui/Spinner";
import { IoIosCheckboxOutline } from "react-icons/io";

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
        toast.success("Login successful");

        // check role here and display page accordingly
        const decodedToken = jwtDecode(response.data.result.token);
        const role = decodedToken.role;
        localStorage.setItem("userToken", response.data.result.token);
        // send data to user state
        dispatch(updateUserDetails(response.data.result.user));
        dispatch(updateUserDetails(decodedToken));

        // role based routing
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          // navigate("/employee/dashboard");
          navigate("/change-default-password");
        } else if (role === "manager") {
          navigate("/manager/dashboard");
        } else {
          alert("invalid role: " + role);
        }
      } else if (response.status === 400) {
        toast.error("bad request " + response);
        // setInvalidCredentials(true);
      }
    } catch (error) {
      console.log("Error during login:", error);
      toast.error(error.response.data.errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center rounded-lg px-3 md:px-0 bg-primaryColor">
      {/* login form and image */}
      <div className="flex flex-1 gap-4 flex-col items-center justify-center md:flex-row  h-full mx-auto bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        {/* image */}
        <div
          className=" md:w-[50%] h-full relative md:flex flex-col pt-4 items-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/realistic-white-golden-geometric-background_79603-2032.jpg?w=740&t=st=1705665643~exp=1705666243~hmac=3550ee53ba53d54b2624727e1180a2d6f70462e149c391cba6a2e405aa262fdf",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full p-3 flex items-center justify-center flex-col gap-2 md:w-[80%] text-center ">
            {/* logos */}
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

            <h1 className="text-2xl font-bold">
              Welcome to the Cyberteq-Falcon Dashboard
            </h1>
            <ul className="hidden md:block">
              {[
                "Manage leave",
                "Order for lunch",
                "Book the conference room",
              ].map((service, i) => (
                <li className="text-xl flex gap-2 items-center" key={i}>
                  <IoIosCheckboxOutline />
                  {service}
                </li>
              ))}
            </ul>
            <img
              src="https://thebftonline.com/wp-content/uploads/2022/12/Cyberteq-is-Cybersecurity-Consulting-Company-of-the-Year-again.jpg"
              alt="display image"
              className="hidden md:block w-[400px] rounded-md"
            />
          </div>
        </div>
        {/* login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-full flex-1">
          {loading && <Spinner />}

          <h1 className="text-xl mb-4 font-bold whitespace-normal">
            Login to your account
          </h1>

          {formFields.map((field, i) => (
            <div className="mb-6 md:w-1/2" key={i}>
              <label className="text-sm font-medium text-gray-900 flex flex-col gap-3">
                {field.label}
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
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
              className="text-primaryColor bg-secondaryColor hover:brightness-125 font-medium rounded-lg text-sm w-full md:w-1/2 px-5 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 text-white">
        <button className="bg-blue-700 p-4">
          <Link to="/admin/dashboard">Admin</Link>
        </button>
        <button className="bg-blue-700 p-4">
          <Link to="/employee/complete-profile">Employee</Link>
        </button>
        <button className="bg-blue-700 p-4">
          <Link to="/manager/dashboard">Manager</Link>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
