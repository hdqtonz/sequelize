const express = require("express");
const UserController = require("../controllers/user.controller.js");
const PostController = require("../controllers/post.controller.js");
const StudentController = require("../controllers/student.controller.js");

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/get-users", UserController.getUsers);
router.delete("/delete-users", UserController.deleteAllUser);
router.delete("/delete-user/:id", UserController.deleteUser);
router.delete("/soft-delete-user/:id", UserController.softDeleteUser);
router.put("/update-user/:id", UserController.updateUserById);
router.get("/v2/get-users", UserController.getUsersV2);
router.get("/get-profile", UserController.getProfile);

//  one to many
router.get("/get-user-posts", PostController.getUserPosts);
router.get("/get-posts", PostController.getPost);

// many to many routes
router.get("/get-students", StudentController.getStudents);
router.get("/get-courses", StudentController.getCourses);

module.exports = router;
