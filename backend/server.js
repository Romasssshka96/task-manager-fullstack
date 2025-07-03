const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');


const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())



// Раздача собранного фронта
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//создание рондомного числа для id
const randomInteger =(min, max)=> {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

const DATA_PATH = path.join(__dirname, 'data.json')

// Загрузка задач из файла
async function loadTasks() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    // Если файла нет — вернём пустой массив
    return [];
  }
}

// Сохранение задач в файл
async function saveTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2))
}

// Получить все задачи
app.get('/tasks', async (req, res) => {
  const tasks = await loadTasks()
  res.json(tasks)
});

// Добавить новую задачу
app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const tasks = await loadTasks();

  const newTask = {
    id: randomInteger(0, 10000),
    text,
    done: false
  };

  tasks.push(newTask);
  await saveTasks(tasks);

  res.status(201).json(newTask);
});

// Отметить как выполненную
app.put('/tasks/toggle-multiple', async (req, res) => {
  const ids = req.body.ids; // ожидаем массив чисел

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids должен быть массивом' });
  }

  let tasks = await loadTasks();

  tasks = tasks.map(task =>
    ids.includes(task.id) ? { ...task, done: !task.done } : task
  );

  await saveTasks(tasks);

  res.json({ success: true })
});

// Удалить задачу
app.delete('/tasks/delete-multiple', async (req, res) => {
  const ids = req.body.ids;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids должен быть массивом' });
  }

  let tasks = await loadTasks()

  tasks = tasks.filter(task => !ids.includes(task.id))
  await saveTasks(tasks)
  res.json({ success: true })
});



//изменение таски
app.put('/tasks/:id', async (req, res) => {

  const taskId = Number(req.params.id)
  const { text } = req.body
  
  try {
    const tasks = await loadTasks();

    const index = tasks.findIndex(t => t.id === taskId)
    if (index === -1) {
      return res.status(404).json({ error: 'Задача не найдена' })
    }

    tasks[index].text = text;

    await saveTasks(tasks);

    res.json(tasks[index])
  } catch (err) {
    console.error('Ошибка при обновлении задачи:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});