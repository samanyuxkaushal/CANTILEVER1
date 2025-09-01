const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
    enum: ['Dining', 'Hiking', 'Co-working', 'Tour', 'Sports', 'Other'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Creates a reference to the User model
    required: true,
  },
  location: {
    name: { type: String, required: true },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },
  activityTime: {
    type: Date,
    required: true,
  },
  participantLimit: {
    type: Number,
    min: 2, // An activity must have at least 2 people
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Create a 2dsphere index on the location.coordinates field for efficient geospatial queries
activitySchema.index({ "location.coordinates": '2dsphere' });

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

