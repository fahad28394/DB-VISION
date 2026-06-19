import User from "../models/users.js";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    //check if user already axist or not

    const existingUser = await User.findOne({
      email,
    });
    //check user exist or not
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //create new user
    const user = await User.create({
      userName,
      email,
      password,
      role,
    });
    user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser };
