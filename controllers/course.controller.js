const { Student, Course } = require("../models");

const addStudentIntoCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    // find value
    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);

    // show error messsage
    if (!course || !student) {
      return res
        .status(400)
        .json({ success: false, message: "Student or Course Not found" });
    }

    // Add value for relationship
    const result = await course.addEnrolledStudent(student);

    return res.status(200).json({
      success: true,
      message: `Student ${student.name} is added to Course ${course.title}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getStudetnsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);
    const students = await course.getEnrolledStudents();

    return res.status(200).json({
      success: true,
      message: "Course Students",
      data: students,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeStudentFromCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    // find value
    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);

    // show error messsage
    if (!course || !student) {
      return res
        .status(400)
        .json({ success: false, message: "Student or Course Not found" });
    }

    // Remove value for relationship by course id
    const result = await course.removeEnrolledStudent(student);

    return res.status(200).json({
      success: true,
      message: `Student ${student.name} is removed from course ${course.title}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addStudentIntoCourse,
  getStudetnsByCourseId,
  removeStudentFromCourse,
};
