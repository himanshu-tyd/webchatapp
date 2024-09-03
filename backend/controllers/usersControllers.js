import User from "../models/userSchema.js";

export const getSideBarUsers=async(req,res)=>{
    try {
        
        const loggedUserid=req.user._id

        const allusers=await User.find({
            _id:{$ne:[loggedUserid]}
        }).select('-password')

        if(!allusers) res.status(404).json({success:false,message:"There are no users on server."})

        res.status(200).json({success:true,message:'Users founded',data:allusers})

    } catch (e) {
        console.log("ERROR IN GETSIDEBARUSERS ->", e);
        return res.status(500).json("INTERNAL SERVER ERROR -->", e);
    }
}