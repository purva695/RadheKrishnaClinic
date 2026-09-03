const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Orthopedics",
                "Dermatology",
                "General Health",
                "Wellness"
            ]
        },

        author: {
            type: String,
            default: "Radhe Krishna Clinic",
            trim: true
        },

        excerpt: {
            type: String,
            required: true,
            trim: true,
            maxlength: 250
        },

        content: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        imagePublicId: {
            type: String,
            default: ""
        },

        published: {
            type: Boolean,
            default: true
        }
    },

    {
        timestamps: true
    }
);


module.exports =
    mongoose.model("Blog", blogSchema);