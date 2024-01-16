import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/_ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../redux/employee-slices/userDetailsSlice";

export default function CompleteProfile() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  console.log(userDetails);

  const onSubmit = (data) => {
    // send data to api here
    dispatch(updateUserDetails(data));

    navigate("/employee/dashboard");
  };

  return (
    <div className="space-y-2">
      <h2>Complete your profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 ">
          {/* Date of Birth */}
          <label className="block text-sm font-medium ">
            Date of Birth<span className="text-red-700">*</span>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </label>
          {/* gender */}
          <label className="block text-sm font-medium ">
            Gender<span className="text-red-700">*</span>
            <select
              {...register("gender")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue="--Select Gender--"
            >
              <option value="--Select Gender--" disabled>
                --Select Gender--
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          {/* ghana card */}
          <label className="block text-sm font-medium ">
            Ghana Card Number
            <input
              type="number"
              {...register("ghanaCardNumber")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </label>
          {/* ssnit number */}
          <label className="block text-sm font-medium ">
            SSNIT Number
            <input
              type="number"
              {...register("ssnitNumber")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </label>
          {/* bank account number */}
          <label className="block text-sm font-medium ">
            Bank Acc. Number
            <input
              type="number"
              {...register("bankAccountNumber")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </label>
          {/* alternative phone number */}
          <label className="block text-sm font-medium ">
            Alternative Phone Number
            <input
              type="number"
              {...register("alternatePhoneNumber")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>
          {/* profile picture */}
          {/* <label className="block text-sm font-medium ">
            Profile Picture<span className="text-red-700">*</span>
            <input
              type="file"
              {...register("profilePicture")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label> */}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
