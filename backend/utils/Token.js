import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {
  const token= jwt.sign({userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });


  res.cookie('jwt',token,{
    maxAge:15*24*60*60*60*1000, //MS
    httpOnly:true, //to prevernt the XSS attacks cross site scripting (accessing cookie via javascipt )
    secure:true, // CSRF Attacks cross-site 
  })
};

export default generateToken