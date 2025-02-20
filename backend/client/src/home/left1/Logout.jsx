import React, { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

function Logout() {
  const [authUser] = useAuth();
  // console.log("authUser" , authUser)
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <div className="w-[4%] message-bg text-white  flex flex-col justify-end ">
        <div className="p-3  align-bottom ">
        <div className="w-12 pb-3"> 
          <img src={authUser.user.profilePicture} className="rounded-full"/>
        </div>
          <button>
            <TbLogout2
              className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
              onClick={handleLogout}
            />
          </button>
        </div>
      </div>
    </>
  );
}
export default Logout;