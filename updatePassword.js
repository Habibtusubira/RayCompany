// Script to update admin password in data.json
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

async function updateAdminPassword(newPassword) {
  try {
    // Path to data file
    const dataFilePath = path.join(__dirname, 'src', 'data', 'data.json');
    
    // Read the current data
    const data = JSON.parse(await fs.readFile(dataFilePath, 'utf8'));
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the admin password
    data.admin.password = hashedPassword;
    
    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    
    console.log('Admin password updated successfully!');
    console.log('New hashed password:', hashedPassword);
  } catch (error) {
    console.error('Error updating admin password:', error);
  }
}

// Get password from command line arguments
const newPassword = process.argv[2];

if (!newPassword) {
  console.log('Usage: node updatePassword.js <newPassword>');
  process.exit(1);
}

updateAdminPassword(newPassword);