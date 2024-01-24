import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import API from "../api/axios";

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
      icon.textContent = "👀";
    } else {
      passwordInput.type = "password";
      icon.textContent = "👁️";
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await API.post("/Users/change-password", data);
      if (response.status === 200) {
        // Handle success
      } else if (response.status === 400) {
        console.log("Bad request " + response);
      }
    } catch (error) {
      console.log("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center rounded-lg ">
      <div className="md:max-w-[60%] h-auto md:min-h-[60vh] bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {loading && (
            <div className="text-center text-primaryColor font-bold mb-4">
              Loading...
            </div>
          )}
          <h1 className="text-2xl font-bold">Change Password</h1>

          {formFields.map((field, i) => (
            <div className="mb-5" key={i}>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                {field.label}
                <div className="password-container">
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
                    👁️
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
            className="text-white bg-primaryColor hover:brightness-125 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
