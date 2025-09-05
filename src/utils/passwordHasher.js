// Utility script to generate hashed passwords
// Run this script separately to generate password hashes

const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// Example usage:
// hashPassword('ergo2024!');

module.exports = { hashPassword };