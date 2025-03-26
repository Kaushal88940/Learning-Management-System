import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,  // ✅ Ensure JWT_SECRET is used correctly
        { expiresIn: process.env.JWT_EXPIRES || "30d" } // ✅ Default expiry if not set
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
        success: true,
        message,
        user,
        token,  // Optional: Return token if needed
    });
};
