import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/users.js";

const register = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;

    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await users.create({
            email,
            password: bcrypt.hashSync(password, 8),
            rol,
            lenguage,
        });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);

        if (error.code === "23505") {
            return res.status(400).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOneEmail(email);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            email,
            user_id: user.user_id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "User logged successfully",
            token,
            email,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const perfil = async (req, res) => {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { email } = decoded;

        const user = await users.findOneEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            email: user.email,
            rol: user.rol,
            lenguage: user.lenguage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userController = {
    login,
    register,
    perfil,
};
