import User from "../models/userSchema.js";
import Message from "../models/messageSchema.js";

export const getSideBarUsers=async(req,res)=>{
    try {
        
        const loggedUserid=req.user._id

        const allusers=await User.find({
            _id:{$ne:loggedUserid}
        }).select('-password')

        const userLastMessages = await Promise.all(
            allusers?.map(async (user) => {
              const lastMessage = await Message.findOne({
                $or: [
                  { senderId: user._id, recieverId: loggedUserid },
                  { senderId: loggedUserid, recieverId: user._id },
                ],
              })
                .sort({ createdAt: -1 }) // Sort by createdAt descending to get the latest message
                .exec(); // Limit to one result
      
              return {
                user: user,
                lastMessage: lastMessage || null,
              };
            })
          );



        // if(!allusers) res.status(404).json({success:false,message:"There are no users on server."})

        res.status(200).json({success:true,message:'Users founded', data:userLastMessages })

    } catch (e) {
        console.log("ERROR IN GETSIDEBARUSERS ->", e);
        return res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR", error: e.message });
    }
}

