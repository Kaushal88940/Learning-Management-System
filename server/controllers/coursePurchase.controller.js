import dotenv from "dotenv";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

dotenv.config();

export const purchaseCourse = async (req, res) => {
  try {
    const userId = req.id;
    let { courseId } = req.body;

    console.log("Received courseId:", courseId); // Debugging

    // ✅ Extract courseId properly if wrapped inside an object
    if (typeof courseId === "object" && courseId.courseId) {
      courseId = courseId.courseId;
    }

    // ✅ Validate courseId format
    if (!courseId || typeof courseId !== "string" || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID format" });
    }

    // ✅ Find the course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // ✅ Check if the user has already purchased the course
    const existingPurchase = await CoursePurchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ message: "You already own this course!" });
    }

    // 🔥 Generate a fake paymentId
    const fakePaymentId = "PAY_" + Math.random().toString(36).substring(2, 15).toUpperCase();

    // ✅ Create a new purchase record
    const newPurchase = new CoursePurchase({
      courseId: new mongoose.Types.ObjectId(courseId),
      userId: new mongoose.Types.ObjectId(userId),
      amount: course.coursePrice,
      paymentId: fakePaymentId, // ✅ Add random paymentId
      status: "completed",
    });

    await newPurchase.save();

    // ✅ Unlock all lectures
    if (course.lectures?.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // ✅ Add course to user's enrolled courses
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: course._id } },
      { new: true }
    );

    // ✅ Add user to course's enrolled students
    await Course.findByIdAndUpdate(
      course._id,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course purchased successfully!",
      paymentId: fakePaymentId, // ✅ Return the fake paymentId
    });
  } catch (error) {
    console.error("❌ Error purchasing course:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Get Course Details & Check Purchase Status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get All Purchased Courses
export const getAllPurchasedCourses = async (req, res) => {
  try {
    const userId = req.id;
    
    const purchasedCourses = await CoursePurchase.find({ userId, status: "completed" }).populate("courseId");

    return res.status(200).json({ purchasedCourses });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
