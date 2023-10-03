const Blog = require('../models/blogModel');

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                blog
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                blog
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({
            status: "success",
            data: {
                blog
            }
        })
    }catch(error){
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// DELETE BLOG Update status to inactive
exports.deleteBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id, {status: "inactive"});

        res.status(200).json({
            status: "success",
            data: {
                blog
            }
        })
    }catch(error){
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL ACTIVE BLOGS
exports.getAllActiveBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({status: "active"});
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL INACTIVE BLOGS
exports.getAllInactiveBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({status: "inactive"});
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL BLOGS BY USER
exports.getAllBlogsByUser = async (req, res) => {
    try {
        const blogs = await Blog.find({userId: req.params.id});
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL ACTIVE BLOGS BY USER
exports.getAllActiveBlogsByUser = async (req, res) => {
    try {
        const blogs = await Blog.find({userId: req.params.id, status: "active"});
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

// GET ALL INACTIVE BLOGS BY USER
exports.getAllInactiveBlogsByUser = async (req, res) => {
    try {
        const blogs = await Blog.find({userId: req.params.id, status: "inactive"});
        res.status(200).json({
            status: "success",
            data: {
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}