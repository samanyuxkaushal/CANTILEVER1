// Main entry point for the backend server

// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const activityRoutes = require('./routes/activity.routes');

// 2. Initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// 3. Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON payloads

// 4. Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => {
  console.error("Database connection error:", err);
  process.exit(1); // Exit process with failure
});

// 5. API Routes
// A simple test route
app.get('/', (req, res) => {
  res.send('Travel Buddy API is running!');
});

// Authentication routes (e.g., /auth/login, /auth/register)
app.use('/auth', authRoutes);
// User and Activity routes (e.g., /api/users/me, /api/activities/nearby)
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);


// 6. Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

