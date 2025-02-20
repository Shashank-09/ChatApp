import Conversation from "../models/conversation.mode.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

// export const sendMessage = async (req , res) => {
//     try {
//         const {message} = req.body
//         const {id: receiverId} = req.params
//         const senderId = req.user._id //current loged user

//         let conversation = await Conversation.findOne({
//             members: { $all: [senderId, receiverId] },
//           });

//           if (!conversation) {
//             conversation = await Conversation.create({
//               members: [senderId, receiverId],
//             });
//           }
//           const newMessage = new Message({
//             senderId,
//             receiverId,
//             message,
//           });
//           if(newMessage){
//             conversation.messages.push(newMessage._id)
//           }
//           await Promise.all([conversation.save() , newMessage.save()])

//           const receiverSocketId  = getReceiverSocketId(receiverId)
//           if(receiverSocketId){
//             io.to(receiverSocketId).emit("newMessage" , newMessage)
//           }

//           res.status(201).json(newMessage);

//     } catch (error) {
//         console.log(error , "Error in sending message")
//         res.status(500).json({message : "Internal server error"})
//     }
// }

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current logged-in user
    const senderRole = req.user.role;
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    const receiverRole = receiver.role;
    console.log("Sender Role:", senderRole, "Receiver Role:", receiverRole);

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (
      !conversation &&
      senderRole === "student" &&
      receiverRole === "recruiter"
    ) {
      return res
        .status(403)
        .json({
          message:
            "Students cannot initiate a chat with recruiters. Only recruiters can start a conversation.",
        });
    }

    if (
      !conversation &&
      (senderRole === "recruiter" ||
        (senderRole === "student" && receiverRole === "student"))
    ) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error, "Error in sending message");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // current loged user
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
