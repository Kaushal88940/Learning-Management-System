import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Stop the server if MongoDB connection fails
  });

const app = express();
const PORT = process.env.PORT || 3001;


// ✅ Fix CORS Issues (Allow Frontend & Postman Requests)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:3001"], // Allow frontend & Postman
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is Running...");
});

// Start Server (Only if MongoDB is connected)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
