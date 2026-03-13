const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const value = await User.create(req.body);

    return res
      .status(200)
      .json({ success: true, message: "Created User", data: value });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { id, pkid, page } = req.query;
    let users;
    let limit = 1;
    let offset = page ? (page - 1) * limit : limit - 1;

    if (pkid) {
      users = await User.findByPk(pkid);
    } else if (id) {
      users = await User.findOne({
        whare: { id },
        attributes: ["id", "name", "email"],
      });
    } else {
      //   users = await User.findAll({
      //     attributes: ["id", "name", "email"],
      //   });

      users = await User.findAndCountAll({
        attributes: ["id", "name", "email"],
        limit: 1,
        offset: offset,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "success", data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createUser, getUsers };
