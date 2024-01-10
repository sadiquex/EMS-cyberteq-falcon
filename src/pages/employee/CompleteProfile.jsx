import { useForm } from "react-hook-form";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const { register, handleSubmit } = useForm();
  const { updateUserDetails } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Update the userDetails state with the form data
    updateUserDetails(data);

    // put data into api here
    // console.log(data);

    // navigate to dashboard
    navigate("/employee/dashboard");
  };

  return (
    <div>
      <h2>Complete your profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 w-full bg-red-400">
          {/* first name */}
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium ">
              First Name<span className="text-red-700">*</span>
            </label>
            <input
              {...register("firstName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          {/* lastname */}
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium ">
              Last Name<span className="text-red-700">*</span>
            </label>
            <input
              {...register("lastName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
        <button type="submit" className="bg-red-400">
          submit
        </button>
      </form>
    </div>
  );
}
