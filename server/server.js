const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Use body-parser to parse JSON payloads


// Routes
const authRoutes = require('./src/routes/authRoutes');
const blogRoutes = require('./src/routes/blogRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
