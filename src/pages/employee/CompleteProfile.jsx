import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/_ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import API from "../../api/axios";
import { updateUserDetails } from "../../redux/features/UserSlice";
import { toast } from "react-toastify";
import { Spinner } from "../../components/_ui/Spinner";

export default function CompleteProfile() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { role, id } = useSelector((state) => state.user?.userDetails);

  const adjustedRole = role === "user" ? "employee" : role;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await API.put(
        `/Users/profile-details`,
        {
          userId: id,
          Gender: data.Gender,
          DateOfBirth: data.DateOfBirth,
          Age: data.Age,
          AlternatePhoneNumber: data.AlternatePhoneNumber,
          ProfileImage: data.ProfileImage[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        dispatch(updateUserDetails(data));
        toast.success("Details updated successfully!");
        // proceed fill your sensitive data
        navigate(`/${adjustedRole}/sensitive-data`);
      } else {
        console.error("Failed to update user details:", response.data);
      }
    } catch (error) {
      toast.error("Please check your details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2>Update your profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* gender */}
          <label className="block text-sm font-medium ">
            Gender <span className="text-red-700">*</span>
            <select
              {...register("Gender", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue=""
            >
              <option value="">--Select Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.Gender && (
              <span className="text-red-500">Gender is required</span>
            )}
          </label>

          {/* Date of Birth */}
          <label className="block text-sm font-medium ">
            Date of Birth <span className="text-red-700">*</span>
            <input
              type="date"
              {...register("DateOfBirth", {
                required: true,
                validate: (value) => {
                  const dobYear = new Date(value).getFullYear();
                  const currentYear = new Date().getFullYear();
                  if (dobYear > 2005) {
                    return "Your date of birth can not be before 2005";
                  }
                  if (dobYear > currentYear) {
                    return "Date of birth cannot be in the future";
                  }
                  return true;
                },
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.DateOfBirth ? "border-red-500" : ""
              }`}
            />
            {errors.DateOfBirth && (
              <span className="text-red-500">{errors.DateOfBirth.message}</span>
            )}
          </label>

          {/* alternative phone number */}
          <label className="block text-sm font-medium ">
            Alternative Phone Number <span className="text-red-700">*</span>
            <input
              type="number"
              {...register("AlternatePhoneNumber", {
                required: true,
                // accept only 10 digits
                pattern: /^\d{10}$/,
              })}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                errors.AlternatePhoneNumber ? "border-red-500" : ""
              }`}
              placeholder="020561288"
            />
            {errors.AlternatePhoneNumber && (
              <span className="text-red-500">
                Enter a valid phone number (10 digits)
              </span>
            )}
          </label>

          {/* profile picture */}
          <label className="block text-sm font-medium ">
            Profile Picture<span className="text-red-700">*</span>
            <input
              type="file"
              {...register("ProfileImage", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.ProfileImage && (
              <span className="text-red-500">Profile Picture is required</span>
            )}
          </label>
        </div>
        <Button
          type="submit"
          className={`mt-4 ${loading ? "bg-gray-300 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Next"}
        </Button>
      </form>
    </div>
  );
}
