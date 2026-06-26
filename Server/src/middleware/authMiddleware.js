import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  //check authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Extract Token
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //Store user information in request
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
};

export default protect;
