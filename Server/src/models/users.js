import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["ADMIN", "DBA", "VIEWER"],
      default: "VIEWER",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  //if password is not changed continue

  //generate salt
  const salt = await bcrypt.genSalt(10);

  //hash password
  this.password = await bcrypt.hash(this.password, salt);
});
// Compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default mongoose.model("User", userSchema);
