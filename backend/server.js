const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");


/* Load environment variables */

dotenv.config();


/* Connect MongoDB */

connectDB();


/* Create Express app */

const app = express();


/* Middleware */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


/* Test Route */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Radhe Krishna Clinic API is running"
    });

});


/* Start Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});