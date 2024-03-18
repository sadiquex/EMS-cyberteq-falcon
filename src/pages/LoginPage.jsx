import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
    placeholder: "e.g; employee@falcontech.com",
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await API.post("/Users/login", data);
      if (response?.status === 200) {
        // send data to user state
        dispatch(updateUserDetails(response?.data?.result.user));
        //
        localStorage.setItem("userToken", response?.data?.result.token);

        const decodedToken = jwtDecode(response?.data?.result.token);
        dispatch(updateUserDetails(decodedToken));

        // role based routing
        const role = decodedToken?.role;

        if (role === "admin") {
          if (decodedToken.passwordChanged === "False") {
            navigate("/change-default-password");
          } else if (decodedToken.profileCompleted === "False") {
            navigate("/admin/complete-profile");
          } else {
            navigate("/admin/dashboard");
          }
        }
        // employee
        else if (role === "user") {
          if (decodedToken.passwordChanged === "False") {
            navigate("/change-default-password");
          } else if (decodedToken.profileCompleted === "False") {
            navigate("/employee/complete-profile");
          }
          // if both are true, go to dashboard
          else {
            navigate("/employee/dashboard");
          }
        }
        // manager
        else if (role === "manager") {
          if (decodedToken.passwordChanged === "False") {
            navigate("/change-default-password");
          } else if (decodedToken.profileCompleted === "False") {
            navigate("/manager/complete-profile");
          } else {
            navigate("/manager/dashboard");
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center rounded-lg px-3 md:px-0 bg-primaryColor">
      {/* login form and image */}
      <div className="flex flex-1 gap-4 flex-col items-center justify-center md:flex-row  h-full mx-auto bg-primaryColor rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        {/* image */}
        <div
          className=" md:w-[50%] h-full md:h-screen relative md:flex flex-col pt-4 items-center justify-center"
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
                className="w-[80px] h-[80px] object-cover rounded-full"
                // animate-bounce
              />
            </div>

            <h1 className="text-2xl ">
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
          </div>
        </div>
        {/* login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-full flex-1">
          <h1 className="text-xl mb-4 font-bold whitespace-normal">
            Login to your account
          </h1>

          {formFields.map((field, i) => (
            <div className="mb-4 md:w-1/2" key={i}>
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

          <div className="md:w-1/2 pb-4 flex justify-center items-center">
            {loading && <Spinner />}
          </div>

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
    </div>
  );
};

export default LoginPage;
