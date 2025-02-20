import axios from "axios";
import useConversation from "../statemanage/useConversation.js";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
       setLoading(true);
       try {
         const res = await axios.post(
            `/api/message/send/${selectedConversation._id}`,
            { message }
         );

         setMessage([...messages, res.data]);
       } catch (error) {
         console.error("Error in send messages", error);

         // Check if the error response is 403 (Forbidden)
         if (error.response?.status === 403) {
            toast.error("Only recruiters can initiate chat!", {
                position: "top-center",
            });
         } else {
            toast.error("Message failed to send!");
         }
       } finally {
         setLoading(false);
       }
    };

    return { loading, sendMessages };
};

export default useSendMessage;
