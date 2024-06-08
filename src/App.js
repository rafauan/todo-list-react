import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

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
        <TaskInput
          task={task}
          setTask={setTask}
          isEditing={isEditing}
          addTask={addTask}
        />
        <TaskList
          tasks={tasks}
          editTask={editTask}
          confirmDelete={confirmDelete}
          isEditing={isEditing}
          editIndex={editIndex}
        />
      </header>
    </div>
  );
}

export default App;
