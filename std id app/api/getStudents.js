const { put, list } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, id } = req.body;

  if (!name || !id) {
    return res.status(400).json({ error: 'Missing name or id' });
  }

  const fileName = `students.json`;

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

  res.status(201).json({ message: 'Student added', student: { name, id } });
};
