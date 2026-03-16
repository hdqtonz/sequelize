const { Student, Course } = require("../models");

const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: {
        model: Course,
        as: "enrolledCourses",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Fetched Students", data: students });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: Student,
        as: "enrolledStudents",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Fetched Courses", data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const enrollIntoCourse = async (req, res) => {
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
    const result = await student.addEnrolledCourse(course);

    return res.status(200).json({
      success: true,
      message: `Course ${course.title} added to student ${student.name}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1: way
    // const student = await Student.findOne({
    //   where: {
    //     id: studentId,
    //   },
    //   include: {
    //     model: Course,
    //     as: "enrolledCourses",
    //   },
    // });

    // 2: way
    // const student = await Student.findByPk(studentId, {
    //   include: {
    //     model: Course,
    //     as: "enrolledCourses",
    //   },
    // });

    // 3: way
    const student = await Student.findByPk(studentId);
    const courses = await student.getEnrolledCourses();

    return res.status(200).json({
      success: true,
      message: "Student Courses",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const studentRemoveFromCourse = async (req, res) => {
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

    // Remove value for relationship
    const result = await student.removeEnrolledCourse(course);

    return res.status(200).json({
      success: true,
      message: `Course ${course.title} removed from student ${student.name}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStudents,
  getCourses,
  enrollIntoCourse,
  getCoursesByStudentId,
  studentRemoveFromCourse,
};
