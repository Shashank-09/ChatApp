import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../statemanage/useConversation.js";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const {socket , onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(user._id)

  return (
    <div
    className={`hover:bg-slate-600 duration-300 ${
      isSelected ? "bg-slate-700" : ""
    }`}
    onClick={() => setSelectedConversation(user)}
  >
    <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src="https://imgs.search.brave.com/QIm_uVrjsZR9cZbkt9q-A8ojCWANjt1HDR4jBBMg_dI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzEyLzEz/Lzg3OTcyNTdmLTll/OTctNGJmMi1iYzI2/LTZmMGJhNWQ2OWRh/Yy5qcGc" />  
        </div>
      </div>
      <div>
      <h1 className=" font-bold">{user.name}</h1>
      <span>{user.role}</span>
      </div>
    </div>
  </div>
  )
}

export default User