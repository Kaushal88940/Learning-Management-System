import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { purchaseCourse,getAllPurchasedCourses, getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/purchase").post(isAuthenticated, purchaseCourse);

router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated, getAllPurchasedCourses);

export default router;
