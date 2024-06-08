import React from 'react';

function TaskList({ tasks, editTask, confirmDelete, isEditing, editIndex }) {
  return (
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
  );
}

export default TaskList;