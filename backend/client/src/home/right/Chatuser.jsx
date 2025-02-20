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
    <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 message-header  duration-300">
      <div>
        <div className={getOnlineUsersStatus}
        >
          <div className="w-14 rounded-full">
          <img src={selectedConversation.profilePicture}  />  
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