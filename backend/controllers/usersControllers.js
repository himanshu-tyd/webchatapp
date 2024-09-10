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


              //QUERY FOR FINDING LATEST MESSAGE
              const lastMessage = await Message.findOne({
                $or: [
                  { senderId: user._id, recieverId: loggedUserid },
                  { senderId: loggedUserid, recieverId: user._id },
                ],
              })
                .sort({ createdAt: -1 }) // SORTING TO GET THE LATEST MESSAGE
                .exec(); // EXECUTING THE QUERY
      
              return {
                user: user,  // ALL USER INFO
                lastMessage: lastMessage || null, // LATEST MESSAGE OR NULL IF NO MESSAGE
              };
            })
          );


        res.status(200).json({success:true,message:'Users founded', data:userLastMessages }) // RETUIRING TOW OBJECTS (USERS AND LATEST MESSAGES) 

    } catch (e) {
        console.log("ERROR IN GETSIDEBARUSERS ->", e);
        return res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR", error: e.message });
    }
}

