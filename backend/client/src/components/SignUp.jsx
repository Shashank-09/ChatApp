import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const SignUp = () => {
  const [authUser, setAuthUser] = useAuth();
  const [profilePicture, setProfilePicture] = useState(""); // Store Base64 image

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  // Convert Image to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Store Base64 string
      };
    }
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      profilePicture: profilePicture, // Sending Base64 image
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    <div className="flex h-screen message-bg">
      <div className="w-2/5 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="user-bg  px-6 py-2 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-blue-600 font-bold"> Hiring Chat Portal</h1>
        <h2 className="text-2xl">
          Create a new{" "}
          <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Fullname"
          className="input input-bordered w-full"
          {...register("name", { required: "Full name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        {/* Role Selection */}
        <select
          {...register("role", { required: "Please select a role" })}
          className="select select-bordered w-full"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-sm">{errors.role.message}</span>
        )}

        {/* Image Upload */}
        <div class="label">
          <span class="label-text">Select Profile Image</span>
        </div>
        <input
          type="file"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />
        {errors.profilePicture && (
          <span className="text-red-500 text-sm">{errors.role.profilePicture}</span>
        )}

        {/* Preview Image */}
        {profilePicture && (
          <div className="justify-center flex">
            <img
              src={profilePicture}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-full object-cover"
            />
          </div>
        )}

        {/* Signup Button */}
        <input
          type="submit"
          value="Signup"
          className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
        />

        <p>
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 underline ml-1">
            Login
          </Link>
        </p>
      </form>
      </div>
      <div className="w-3/5 flex items-center justify-center">
          <img
            src="https://talkjs.com/new-web/talkjs-chat-sample-14.svg"
            alt="Description"
            className="w-full h-[600px] "
          />
        </div>
    </div>
  );
};

export default SignUp;
