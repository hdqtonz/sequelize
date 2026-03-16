const { User, Post } = require("../models");

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.query;

    const userPosts = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Post,
        as: "posts",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Fetched Posts", data: userPosts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.query;

    const post = await Post.findOne({
      where: {
        id: id,
      },
      include: {
        model: User,
        as: "user",
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Fetched Post", data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserPosts, getPost };
