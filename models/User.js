import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot be longer than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot be longer than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include the password in queries by default
    },
    googleId: {
      type: String,
      unique: true, // Will be used for Google login
      sparse: true, // Allows null values to coexist with unique constraint
    },
    appleId: {
      type: String,
      unique: true, // Will be used for Apple login
      sparse: true, // Allows null values to coexist with unique constraint
    },
    birthdate: {
      type: Date,
      required: [true, 'Birthdate is required'],
    },
    profilePicture: {
      type: String, // URL to profile picture
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Export the model as the default export
const User = mongoose.model('User', userSchema);
export default User;
