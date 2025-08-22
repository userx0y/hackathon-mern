import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  if (!name || !email || !password || !confirm_password) {
    return res.send({ status: "failed", message: "Please fill out all fields" });
  }

  if (password !== confirm_password) {
    return res.send({ status: "failed", message: "Password & Confirm Password doesn't match!!!" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (user) {
    return res.send({ status: "failed", message: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase().trim(),
    password: hashed
  });

  await newUser.save();
  return res.send({ status: "success", message: "User created successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ status: "failed", message: "All fields are required❗" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.send({ status: "failed", message: "Invalid email or password ❌" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send({ status: "failed", message: "Invalid email or password ❌" });
  }
  const name = user.name;
  return res.send({ status: "success", message: "Login successful ✅", name });
};
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.send({ status: "success", message: "Logged out ✅" });
  });
};
