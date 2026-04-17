// public/script.js

document.getElementById('studentForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const res = await fetch('/api/addStudent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, id })
  });
  if (res.ok) {
    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    loadStudents();
  } else {
    alert('Failed to add student');
  }
});

async function loadStudents() {
  const res = await fetch('/api/getStudents');
  const students = await res.json();
  const list = document.getElementById('studentList');
  list.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} (${s.id})`;
    list.appendChild(li);
  });
}

// Initial load
loadStudents();
