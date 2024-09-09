import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {

  const token= jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });


  res.cookie('jwt',token,{
    maxAge:15*24*60*60*1000, //15 days
    httpOnly:true, //to prevernt the XSS attacks cross site scripting (accessing cookie via javascipt )
    secure:process.env.NODE_ENV==='production', //to prevent the CSRF Attacks cross-site
  })
  console.log(process.env.NODE_ENV);
};

export default generateToken