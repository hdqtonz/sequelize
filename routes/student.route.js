const express = require("express");
const StudentController = require("../controllers/student.controller.js");

const router = express.Router();

router.post(
  "/enroll/:studentId/course/:courseId",
  StudentController.enrollIntoCourse,
);

router.get(
  "/student/:studentId/courses",
  StudentController.getCoursesByStudentId,
);

router.delete(
  "/enroll/:studentId/course/:courseId",
  StudentController.studentRemoveFromCourse,
);

module.exports = router;
