const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/error");
const getGfgScores = require("./controllers/gfg");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config();
}


app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://enchanting-gold-goose.cyclic.app', 
        'https://enchanting-gold-goose.cyclic.app/', 
        'https://rcoem-coderz.onrender.com',
        'https://rcoem-coderz.onrender.com/',
        'https://rcoem-coderz.netlify.app', 
        'https://rcoem-coderz.netlify.app/', 
        'https://rcoem-coderz.netlify.app/*', 
        'https://indian-coderz.netlify.app', 
        'https://indian-coderz.netlify.app/', 
        'https://indian-coderz.netlify.app/*', 
        '*'
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// Route Imports

app.get("/:id", getGfgScores);

app.get("*", (req, res) => {
    res.send("Welcome to INDIAN CODERZ API");
});


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;