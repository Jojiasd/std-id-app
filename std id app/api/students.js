
const { put, list } = require('@vercel/blob');

module.exports = async (req, res) => {
  const fileName = 'students.json';

  // -------------------------
  // POST → Add Student
  // -------------------------
  if (req.method === 'POST') {
    const { name, id } = req.body;

    if (!name || !id) {
      return res.status(400).json({ error: 'Missing name or id' });
    }

    let students = [];

    try {
      const existing = await list({ prefix: fileName });

      if (existing.blobs.length > 0) {
        const data = await fetch(existing.blobs[0].url);
        students = await data.json();
      }
    } catch (err) {
      students = [];
    }

    students.push({ name, id });

    await put(fileName, JSON.stringify(students), {
      access: 'public',
      addRandomSuffix: false
    });

    return res.status(201).json({
      message: 'Student added',
      student: { name, id }
    });
  }

  // -------------------------
  // GET → Get Students
  // -------------------------
  if (req.method === 'GET') {
    try {
      const files = await list({ prefix: fileName });

      if (files.blobs.length === 0) {
        return res.status(200).json([]);
      }

      const data = await fetch(files.blobs[0].url);
      const students = await data.json();

      return res.status(200).json(students);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
  }

  // -------------------------
  // Other methods
  // -------------------------
  return res.status(405).json({ error: 'Method not allowed' });
};
