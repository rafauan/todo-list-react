import React from 'react';

function TaskInput({ task, setTask, isEditing, addTask }) {
  return (
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
  );
}

export default TaskInput;
