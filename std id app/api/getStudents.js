// GET /api/getStudents.js
// Returns all students from the Blob (simulated with a JSON file for demo)
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'students.json');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let students = [];
  if (fs.existsSync(DATA_PATH)) {
    students = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  }
  res.status(200).json(students);
};
