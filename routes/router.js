const express = require("express");
const UserController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/get-users", UserController.getUsers);

module.exports = router;
