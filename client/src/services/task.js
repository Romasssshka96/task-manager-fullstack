// src/services/tasks.js

const API_URL = '';

export async function serverGetTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function serverAddTask(text) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
  return res.json();
}



export async function serverDeleteTask(ids) {
  const res = await fetch(`${API_URL}/tasks/delete-multiple`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
  });
  return res.json();
}

export async function serverEditTask(id, newText) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: newText }),
  });
  return res.json();
}

export async function serverMarkTaskAsDone(ids) {
    const res = await fetch(`${API_URL}/tasks/toggle-multiple`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    return res.json();
  }













































