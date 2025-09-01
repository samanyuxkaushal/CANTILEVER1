Travel Buddy
Travel Buddy is a web-based platform designed to connect travelers who are in the same location or heading to similar destinations. The application allows users to find each other, create personal profiles, and organize or join shared activities like dinners, hiking trips, or co-working sessions.

Features
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).

Personal Profiles: Users can create and update their profiles with a name, bio, and profile picture.

Location-Based Discovery: A dynamic map interface powered by the Google Maps API displays nearby users and activities in real-time.

Activity Management:

Users can create new activities with a title, description, time, location, and a participant limit.

Browse and discover activities created by other travelers.

Join and leave activities.

Real-time Group Chat: (In Progress) Group chat functionality for each activity to help participants coordinate plans.

Tech Stack
The project is built with the MERN stack and utilizes several modern web technologies:

Frontend:

React.js: A JavaScript library for building user interfaces.

React Router: For declarative routing within the application.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Axios: For making promise-based HTTP requests to the backend.

@react-google-maps/api: React components for the Google Maps API.

Backend:

Node.js: A JavaScript runtime environment.

Express.js: A minimal and flexible Node.js web application framework.

MongoDB: A NoSQL database for storing user and activity data.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

JSON Web Tokens (JWT): For securing API endpoints.

bcryptjs: For hashing user passwords.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js & npm: Make sure you have Node.js and npm installed. You can download them here.

MongoDB: You need a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

Installation
Clone the repository:

git clone [https://github.com/your-username/travel-buddy.git](https://github.com/your-username/travel-buddy.git)
cd travel-buddy

Setup the Backend:

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# (copy the contents from .env.example)
touch .env

# Start the backend server
npm start

Setup the Frontend:

# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
# (copy the contents from .env.example)
touch .env

# Start the React development server
npm start

Environment Variables
You need to create .env files in both the frontend and backend directories.

backend/.env

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

frontend/.env

REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Note: To get a Google Maps API key, you need to set up a project in the Google Cloud Console and enable the "Maps JavaScript API" and "Places API".

Project Structure
travel-buddy/
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── middleware/     # Express middleware (e.g., auth)
│   ├── routes/         # API routes
│   └── server.js       # Main backend server file
├── frontend/
│   ├── src/
│   │   └── App.jsx     # Main React application component
│   └── public/
└── .gitignore          # Files and folders ignored by Git

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
