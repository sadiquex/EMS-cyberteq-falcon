import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../components/_ui/Spinner";
import { logOut, updateUserDetails } from "../../redux/features/UserSlice";
import Button from "../../components/_ui/Button";
import API from "../../api/axios";

export default function SensitiveData() {
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

  const sensitiveDataFields = [
    {
      name: "bankAccount",
      label: "Bank Account Number",
      type: "number",
      placeholder: "eg: **** **** **** ****",
      errorMessage: "Please enter your bank account number",
    },
    {
      name: "nationalId",
      label: "National ID Number",
      type: "text",
      placeholder: "eg: GHA-**** **** ****",
      errorMessage: "A valid ID number is required",
    },
    {
      name: "tin",
      label: "TIN Number",
      type: "number",
      placeholder: "eg: **** **** ****",
      errorMessage: "Enter a valid TIN number",
    },
    {
      name: "ssnit",
      label: "SSNIT Number",
      type: "number",
      placeholder: "eg: **** **** ****",
      errorMessage: "Enter a valid SSNIT number",
    },
    {
      name: "apexNumber",
      label: "Apex Number",
      type: "number",
      placeholder: "eg: **** **** ****",
      errorMessage: "Enter a valid Apex number",
    },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await API.put(`/Users/sensitive-user-details/`, {
        userId: id,
        ...data,
        // bankAccount: data.bankAccount,
        // nationalId: data.nationalId,
        // tin: data.tin,
        // ssnit: data.ssnit,
        // apexNumber: data.apexNumber,
      });

      if (response.status === 200) {
        setLoading(false);
        // dispatch(updateUserDetails(data));
        toast.success("Sensitive information updated");
        // dispatch(logOut());
        navigate(`/${adjustedRole}/dashboard`);
      } else {
        console.error(
          "Failed to update sensitive user details:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error updating sensitive details:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2>Update your other details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {sensitiveDataFields.map((field, index) => (
            <label key={index} className="block text-sm font-medium">
              {field.label} <span className="text-red-700">*</span>
              <input
                type={field.type}
                {...register(field.name, { required: true })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <span className="text-red-500">{field.errorMessage}</span>
              )}
            </label>
          ))}
        </div>
        <Button
          type="submit"
          className={`mt-4 ${loading ? "bg-gray-300 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}
