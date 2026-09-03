const express = require("express");

const Blog =
    require("../models/Blog");

const protect =
    require("../middleware/authMiddleware");


const router =
    express.Router();



/* =========================================
   GET ALL BLOGS
   Public
========================================= */

router.get(
    "/",
    async (req, res) => {

        try {

            const blogs =
                await Blog.find({
                    published: true
                })
                .sort({
                    createdAt: -1
                });


            res.json(blogs);


        } catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Unable to fetch blogs."

            });

        }

    }
);



/* =========================================
   GET SINGLE BLOG
   Public
========================================= */

router.get(
    "/:id",
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
                    req.params.id
                );


            if (!blog) {

                return res.status(404).json({

                    message:
                        "Blog not found."

                });

            }


            res.json(blog);


        } catch (error) {

            res.status(500).json({

                message:
                    "Unable to fetch blog."

            });

        }

    }
);



/* =========================================
   CREATE BLOG
   Admin Only
========================================= */

router.post(
    "/",
    protect,
    async (req, res) => {

        try {

            const {
                title,
                category,
                author,
                excerpt,
                content,
                image
            } = req.body;


            const blog =
                await Blog.create({

                    title,
                    category,
                    author,
                    excerpt,
                    content,
                    image

                });


            res.status(201).json({

                message:
                    "Blog created successfully.",

                blog

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Unable to create blog."

            });

        }

    }
);



/* =========================================
   UPDATE BLOG
   Admin Only
========================================= */

router.put(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const {
                title,
                category,
                author,
                excerpt,
                content,
                image,
                removeImage
            } = req.body;


            const blog =
                await Blog.findById(
                    req.params.id
                );


            if (!blog) {

                return res.status(404).json({

                    message:
                        "Blog not found."

                });

            }


            blog.title =
                title;

            blog.category =
                category;

            blog.author =
                author;

            blog.excerpt =
                excerpt;

            blog.content =
                content;



            /*
                If user removes image,
                clear image URL.
            */

            if (removeImage === true) {

                blog.image = "";

                blog.imagePublicId = "";

            }


            /*
                If a new image is supplied,
                use it.
            */

            if (
                image &&
                image.trim() !== ""
            ) {

                blog.image =
                    image;

            }


            await blog.save();


            res.json({

                message:
                    "Blog updated successfully.",

                blog

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Unable to update blog."

            });

        }

    }
);



/* =========================================
   DELETE BLOG
   Admin Only
========================================= */

router.delete(
    "/:id",
    protect,
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
                    req.params.id
                );


            if (!blog) {

                return res.status(404).json({

                    message:
                        "Blog not found."

                });

            }


            await Blog.findByIdAndDelete(
                req.params.id
            );


            res.json({

                message:
                    "Blog deleted successfully."

            });


        } catch (error) {

            console.error(error);


            res.status(500).json({

                message:
                    "Unable to delete blog."

            });

        }

    }
);



module.exports = router;