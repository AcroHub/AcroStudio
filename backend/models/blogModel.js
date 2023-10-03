const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter blog title"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Please enter blog description"],
        trim: true,
    },
    content:{
        type: String,
        required: [true, "Please enter blog content"],
        trim: true,
    },
    status : {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Blog", blogSchema);