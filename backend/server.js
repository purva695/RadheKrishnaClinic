const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const bcrypt = require("bcryptjs");



/* =========================================
   LOAD ENVIRONMENT VARIABLES
========================================= */

dotenv.config();



/* =========================================
   APP
========================================= */

const app =
    express();



/* =========================================
   MIDDLEWARE
========================================= */

app.use(
    cors()
);


app.use(
    express.json({
        limit: "10mb"
    })
);


app.use(
    express.urlencoded({
        extended: true
    })
);



/* =========================================
   ROUTES
========================================= */

const authRoutes =
    require("./routes/authRoutes");


const blogRoutes =
    require("./routes/blogRoutes");


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/blogs",
    blogRoutes
);



/* =========================================
   TEST ROUTE
========================================= */

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "Radhe Krishna Clinic API is running."

        });

    }
);



/* =========================================
   CREATE DEFAULT ADMIN
========================================= */

const Admin =
    require("./models/Admin");


async function createDefaultAdmin() {

    try {

        const existingAdmin =
            await Admin.findOne({
                email:
                    process.env.ADMIN_EMAIL
            });


        if (existingAdmin) {

            return;

        }


        const hashedPassword =
            await bcrypt.hash(
                process.env.ADMIN_PASSWORD,
                12
            );


        await Admin.create({

            email:
                process.env.ADMIN_EMAIL,

            password:
                hashedPassword

        });


        console.log(
            "Default admin created."
        );


    } catch (error) {

        console.error(
            "Admin creation error:",
            error.message
        );

    }

}



/* =========================================
   DATABASE CONNECTION
========================================= */

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(
        async () => {

            console.log(
                "MongoDB connected successfully."
            );


            await createDefaultAdmin();


            const PORT =
                process.env.PORT || 5000;


            app.listen(
                PORT,
                () => {

                    console.log(
                        `Server running on port ${PORT}`
                    );

                }
            );

        }
    )
    .catch(
        (error) => {

            console.error(
                "MongoDB connection failed:",
                error.message
            );

        }
    );