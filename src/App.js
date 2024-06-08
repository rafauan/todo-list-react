import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      if (isEditing) {
        const updatedTasks = tasks.map((item, index) =>
          index === editIndex ? task : item
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const confirmDelete = (index) => {
    if (window.confirm("Czy na pewno chcesz usunąć to zadanie?")) {
      deleteTask(index);
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista TODO</h1>
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Dodaj nowe zadanie..."
          />
          <button onClick={addTask}>
            {isEditing ? "Aktualizuj" : "Dodaj"}
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${isEditing && editIndex === index ? 'editing' : ''}`}>
              {task}
              <div>
                <button onClick={() => editTask(index)} className="btnEdit">Edytuj</button>
                <button onClick={() => confirmDelete(index)} className="btnDelete">Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
