import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axios";
import { toast } from "react-toastify";

const formFields = [
  {
    name: "oldPassword",
    label: "Your default (old) password",
    type: "password",
  },
  {
    name: "newPassword",
    label: "Your new password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
  },
];

export default function ChangeDefaultPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileCompleted } = useSelector((state) => state.user?.userDetails);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = (fieldName) => {
    const passwordInput = document.getElementById(fieldName);
    const icon = document.querySelector(`#${fieldName}-toggle`);

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      icon.textContent = "Show";
    }
  };

  const checkProfileCompleted = () => {
    // if he hasn't completed his profile
    if (profileCompleted !== "True") {
      navigate("employee/complete-profile");
    } else {
      navigate("/employee/dashboard");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await API.post("/Users/change-password", data);
      if (response.status === 200) {
        toast.success("Password changed");
        checkProfileCompleted();
      }
    } catch (error) {
      toast.error(error.response.data.errorMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center rounded-lg ">
      <div className="md:max-w-[60%] h-auto md:min-h-[60vh] bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {loading && (
            <div className="text-center text-secondaryColor font-bold mb-4">
              Loading...
            </div>
          )}
          <h1 className="text-2xl font-bold">Change Password</h1>

          {formFields.map((field, i) => (
            <div className="mb-5" key={i}>
              <label className="block mb-2 text-sm font-medium text-secondaryColor ">
                {field.label}
                <div className="flex gap-2 items-center justify-center">
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
                  <span
                    id={`${field.name}-toggle`}
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility(field.name)}
                  >
                    Show
                  </span>
                </div>
                {errors[field.name]?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="text-primaryColor bg-secondaryColor hover:brightness-125 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Change Password
          </button>
        </form>

        <button
          type="submit"
          className="text-primaryColor bg-red-600 hover:brightness-125 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          onClick={checkProfileCompleted}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
