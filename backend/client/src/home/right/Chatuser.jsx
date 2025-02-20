import React from "react";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import useConversation from "../../statemanage/useConversation.js";

function Chatuser() {
  const { selectedConversation } = useConversation();
  console.log(selectedConversation)
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
        <div className={getOnlineUsersStatus}
        >
          <div className="w-14 rounded-full">
          <img src="https://imgs.search.brave.com/QIm_uVrjsZR9cZbkt9q-A8ojCWANjt1HDR4jBBMg_dI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzEyLzEz/Lzg3OTcyNTdmLTll/OTctNGJmMi1iYzI2/LTZmMGJhNWQ2OWRh/Yy5qcGc" />  

          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.name}</h1>
        <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;