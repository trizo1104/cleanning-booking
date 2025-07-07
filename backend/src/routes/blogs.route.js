const express = require("express");
const blogsRoute = express.Router();
const Blog = require("../models/blogs");

blogsRoute.get("/", async (req, res) => {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.json(posts);
});

blogsRoute.get("/:id", async (req, res) => {
  const post = await Blog.findById(req.params.id);
  res.json(post);
});

blogsRoute.post("/", async (req, res) => {
  const { title, content, image } = req.body;
  const newPost = new Blog({ title, content, image });
  await newPost.save();
  res.status(201).json(newPost);
});

blogsRoute.post("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = blogsRoute;
