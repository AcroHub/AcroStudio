const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middleware/error');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cookieParser());

// Route Imports
const user = require('./routes/userRoute');
const blog = require('./routes/blogRoute');

app.use("/api/v1", user);
app.use("/api/v1", blog);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;