const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    console.log(req.user.user.id);

    const blog = new Blog({
      title,
      content,
      category,
      author: req.user.user.id, // Assuming req.user contains the authenticated user's ID
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const blogs = await Blog.find({ category });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchBlogs = async (req, res) => {
  try {
    const searchTerm = req.query.query; // Adjusted to match the 'query' parameter
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // case-insensitive search
        { content: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogsByCategory,
  searchBlogs,
};
