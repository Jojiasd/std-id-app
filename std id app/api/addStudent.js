// POST /api/addStudent.js
// Receives student data and stores it in a Blob (simulated with a JSON file for demo)
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'students.json');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let students = [];
  if (fs.existsSync(DATA_PATH)) {
    students = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  }
  const { name, id } = req.body;
  if (!name || !id) {
    res.status(400).json({ error: 'Missing name or id' });
    return;
  }
  students.push({ name, id });
  fs.writeFileSync(DATA_PATH, JSON.stringify(students, null, 2));
  res.status(201).json({ message: 'Student added', student: { name, id } });
};
