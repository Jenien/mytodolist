const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");
require("dotenv").config();
const {
  createUserSchema,
  loginSchema
} = require("../validation/auth.validations");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validasi input login menggunakan schema
    const { value, error } = await loginSchema.validateAsync({ email, password });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        err: error.message,
        data: null,
      });
    }

    // Periksa user di database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password",
        data: null,
      });
    }

    // Buat payload token JWT dengan informasi pengguna
    const payload = {
      userId: user.userId,
      email: user.email,
      username: user.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Mengembalikan token JWT dan profil pengguna dalam respons
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        profile: payload,
      },
    });
  } catch (error) {
    next(error); 
  }
};


const registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body; 

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        err: "Missing required fields",
        data: null,
      });
    }

    const { value, error } = await createUserSchema.validateAsync({
      email,
      password,
      username,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
        err: error.message,
        data: null,
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, username }, 
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to register user",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId: newUser.userId,
        email: newUser.email,
        username: newUser.username
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers= async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  registerUser,
  getAllUsers
};
