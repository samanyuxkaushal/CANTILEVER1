const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// As described in the project plan
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://placehold.co/400x400/EFEFEF/AAAAAA?text=avatar',
  },
  bio: {
    type: String,
    default: '',
  },
  // GeoJSON format for geospatial queries
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
  futureDestinations: [{
    locationName: String,
    coordinates: [Number], // [longitude, latitude]
    startDate: Date,
    endDate: Date,
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// --- Mongoose Middleware ---

// This function runs before a user document is saved to the database
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// --- Mongoose Model Method ---

// Method to compare candidate password with the user's hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

// Create a 2dsphere index for geospatial queries on currentLocation
userSchema.index({ currentLocation: '2dsphere' });

module.exports = User;

