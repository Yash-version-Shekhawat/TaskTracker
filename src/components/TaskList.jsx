import React, { useState } from 'react';
import Timer from './Timer';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleEditClick = (task) => {
    setEditingTaskId(task.id); 
    setStatus(task.status);  
    setDeadline(task.deadline || '');
  };

  const handleSubmitEdit = (task) => {
    const updatedTask = { ...task, status, deadline };
    onUpdateTask(updatedTask); 
    setEditingTaskId(null); 
  };
  const getBackgroundColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#ffadad90';
      case 'In Progress':
        return '#ffd6a590';
      case 'Completed':
        return '#caffbf90';
      default:
        return '#dee2e680'; 
    }
  };

  return (
    <div className='mx-4 my-6'>
      <h3 className='fonty2 font-extrabold mb-1 ml-3'>TASK LIST :</h3>
      <div className="task-container flex flex-wrap gap-4 p-4 border-[#dee2e680] border-2 rounded-xl bg-white">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card w-[32.4%] p-3 rounded-xl"
            style={{ backgroundColor: getBackgroundColor(task.status) }} 
          >
            <h4 className="fonty2 font-bold">{task.title}</h4>
            <p className="fonty2 font-medium">{task.description}</p>
            <p className="fonty2 font-medium">Priority: <span>{task.priority}</span></p>

            {editingTaskId !== task.id ? (
              <p className="fonty2 font-medium">Status: {task.status}</p>
            ) : (
              <div>
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="fonty2"
                >
                  <option value="To Do" className='bg-[#ffadad]'>To Do</option>
                  <option value="In Progress" className='bg-[#ffd6a5]'>In Progress</option>
                  <option value="Completed" className='bg-[#caffbf]'>Completed</option>
                </select>
              </div>
            )}
            {editingTaskId !== task.id ? (
              <p className="fonty2 font-medium">
                Deadline: <span className='font-semibold p-[0.15rem] rounded-md'>
                  {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline set'}
                </span>
              </p>
            ) : (
              <div>
                <label>Deadline:</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="fonty2"
                />
              </div>
            )}

            <div>
            </div>
            {editingTaskId !== task.id ? (
              <div className='mt-4'>
                <button
                  onClick={() => handleEditClick(task)}
                  className="fonty2 bg-[#333] p-2 px-3 rounded-md mr-2 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="fonty2 bg-[#333] p-2 px-3 rounded-md text-white"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => handleSubmitEdit(task)}
                  className="fonty2 bg-[#333] p-2 px-3 rounded-md mr-2 text-white"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className="fonty2 bg-red-500 p-2 px-3 rounded-md text-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
