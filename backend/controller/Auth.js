
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



exports.SignUp = async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({ success: false, message: "Fill all details" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            accountType
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, message: "Error occurred in SignUp",error:error.message });
    }
};


exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Fill all details" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2d"
        });

        user.password = undefined; // hide password in response

      
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true
        };

        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                message: "User login successful",
                token,
                user
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error occurred in Login" });
    }
};

