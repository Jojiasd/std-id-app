const { list } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const files = await list({ prefix: 'students.json' });

    if (files.blobs.length === 0) {
      return res.status(200).json([]);
    }

    const data = await fetch(files.blobs[0].url);
    const students = await data.json();

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
