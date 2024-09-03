import Message from "../models/messageSchema.js";
import Conversation from "../models/conversationSchema.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;


    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] }, //TODO: finding conversation between users
    });

    if (!conversation) {
     conversation=await Conversation.create({
       participants:[senderId,recieverId]
      });                                         //TODO: If there is not conversation then create that with id         
    }

    const newMessage=new Message({            //TODO: create new message       
        senderId,
        recieverId,
        message
    })
 
    if(newMessage){
        conversation.messages.push(newMessage._id)  //TODO: push that new message in array of messages
    }
    //SOCKET.IO Function go here
 
    //TODO: parallel run
    await Promise.all([conversation.save(),newMessage.save()])

    res.status(201).json({success:true,message:'new message',data:newMessage})

  } catch (e) {
    console.log("ERROR IN SENDMESSAGE ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};


export const getMessages=async(req,res)=>{
  try {
    
    const {id:chatToId}=req.params

    const senderId=req.user._id


    const conversation=await Conversation.findOne({
      participants:{ $all : [senderId,chatToId] }
    }).populate("messages")
    console.log(conversation);

    if(!conversation) res.status(404).json([]) 
  
    res.status(200).json({success:true,message:'messages found',data:conversation.messages })

  } catch (e) {
    console.log("ERROR IN GETMESSAGE ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
}