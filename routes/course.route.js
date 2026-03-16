const express = require("express");
const CourseController = require("../controllers/course.controller.js");

const router = express.Router();

router.post(
  "/course/:courseId/student/:studentId",
  CourseController.addStudentIntoCourse,
);

router.get(
  "/course/:courseId/studetns",
  CourseController.getStudetnsByCourseId,
);

router.delete(
  "/course/:courseId/student/:studentId",
  CourseController.removeStudentFromCourse,
);

module.exports = router;
