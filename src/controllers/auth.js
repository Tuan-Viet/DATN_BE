import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../validations/auth.js";
dotenv.config();

const { SECRET_CODE } = process.env;

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Kiểm tra nếu req.body.remember là true thì đặt thời hạn của token là 30 ngày, ngược lại là 1 ngày.
    const expiresIn = req.body.remember ? "30d" : "1d";

    const token = jwt.sign({ id: user._id }, SECRET_CODE, { expiresIn });

    user.password = undefined;
    return res.status(201).json({
      message: "success",
      accessToken: token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server!",
      error: error.message
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        messages: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        messages: "Sai mật khẩu",
      });
    }
    const expiresIn = req.body.remember ? "7d" : "1d";

    const token = jwt.sign({ id: user._id }, SECRET_CODE, { expiresIn });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server!",
    });
  }
};

 

