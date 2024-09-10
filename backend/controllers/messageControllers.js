import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";
import { getReveivedUserSocket, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;  //THIS IS USER IS COMING FROM MIDDLEWARE THAT IS OUT PROTECTED ROUTE


    //TODO: QUERY FOR FINDING CONVERSTION IN DATABASE

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }, 
    });


     //TODO: IF THERE IS NO CONVERSTION THEN CREATE WITH ID
    if (!conversation) {
     conversation=await Conversation.create({
       participants:[senderId,recieverId]
      });                                                
    }


    ///TODO: CREATE NEW MESSAGE  

    const newMessage=new Message({            
        senderId,
        recieverId,
        message
    })
 

     //TODO: IF THERE IS NEW MESSAGE THEN PUSH TO CONVERSATION.MESSAGES ARRAY 

    if(newMessage){
        conversation.messages.push(newMessage._id) 
    }
    

    //TODO: SAVE BOTH CONVERSATION AND MESSAGE AT THE SAME TIME (PARALLEL)

    await Promise.all([conversation.save(),newMessage.save()])

   

    // GET THE SOCKET ID OF THE RECEIVER FROM THE userSocketMap OBJECT
    const recieverSocket = getReveivedUserSocket(recieverId);

    // IF THE RECEIVER SOCKET EXISTS, THEN EMIT THE "newMessage" EVENT TO HIM
    if (recieverSocket) {
      io.to(recieverSocket).emit("newMessage", newMessage);

    }


    res.status(201).json({success:true,message:'new message',data:newMessage})

  } catch (e) {
    console.log("ERROR IN SENDMESSAGE ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};


export const getMessages = async (req, res) => {
  try {
 
    const { id: chatToId } = req.params;

    const senderId = req.user._id;


    //FINDING CONVERSATION BETWEEN SENDER AND RECIEVER
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatToId] },
    }).populate("messages");      //POPULATING MESSAGES 


    //IF THER IS NO CHAT THEN RETURN EMPY ARRAY AT START THEY SHOULD SHOW NO MESSAGES
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "No messages", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "messages found",
      data: conversation.messages,
    });
  } catch (e) {
    console.log("ERROR IN GETMESSAGE ->", e);
  
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};
