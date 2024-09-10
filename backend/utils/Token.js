import jwt from "jsonwebtoken";

/**
 * THIS FUNCTION GENERATES JWT TOKEN AND SETS IT IN THE RESPONSE COOKIE
 * @param {string} userId - USER ID TO BE ENCODED IN THE TOKEN
 * @param {object} res - RESPONSE OBJECT TO SET THE COOKIE
 * @returns {void}
 */
const generateToken = (userId, res) => {
  /**
   * SIGNING THE TOKEN WITH THE USER ID AND SECRET KEY
   * expiresIn: "15d" - THE TOKEN WILL EXPIRE AFTER 15 DAYS
   */
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  /**
   * SETTING THE COOKIE WITH THE GENERATED TOKEN
   * maxAge: 15 DAYS IN MILLISECONDS
   * httpOnly: true - TO PREVENT XSS ATTACKS CROSS SITE SCRIPTING ATTACKS
   * secure: true - TO PREVENT CSRF ATTACKS
   */
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 DAYS
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });

  console.log(process.env.NODE_ENV);  // THIS IS DEVELOPMENT OR PRODUCTION SO WE COULD SEE IN THE CONSOLE WHILE DEPLOYING
};

export default generateToken;
