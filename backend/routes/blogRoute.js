const express = require("express");

const router = express.Router();

const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    getAllActiveBlogs,
    getAllInactiveBlogs,
    getAllBlogsByUser,
    getAllActiveBlogsByUser,
    getAllInactiveBlogsByUser
} = require("../controllers/blogController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/blog").post(isAuthenticatedUser, createBlog);
router.route("/blogs").get(isAuthenticatedUser, getAllBlogs);
router.route("/blog/:id").get(isAuthenticatedUser, getSingleBlog);
router.route("/blog/:id").put(isAuthenticatedUser, updateBlog);
router.route("/blog/:id").delete(isAuthenticatedUser, deleteBlog);
router.route("/active/blogs").get(isAuthenticatedUser, getAllActiveBlogs);
router.route("/inactive/blogs").get(isAuthenticatedUser, getAllInactiveBlogs);
router.route("/user/blogs/:id").get(isAuthenticatedUser, getAllBlogsByUser);
router.route("/user/active/blogs/:id").get(isAuthenticatedUser, getAllActiveBlogsByUser);
router.route("/user/inactive/blogs/:id").get(isAuthenticatedUser, getAllInactiveBlogsByUser);


module.exports = router;