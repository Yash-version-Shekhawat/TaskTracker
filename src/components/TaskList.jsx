import React, { useState } from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const [comment, setComment] = useState([]);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setStatus(task.status);
    setDeadline(task.deadline || '');
    setComment(task.comment || []);
  };

  const handleAddComment = () => {
    setComment([...comment, '']); // Add a new empty comment
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = [...comment];
    updatedComments[index] = value; // Update the specific comment
    setComment(updatedComments);
  };

  const handleSubmitEdit = (task) => {
    const updatedTask = { ...task, status, deadline, comment };
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
    <div className="mx-4 my-6">
      <h3 className="fonty2 font-extrabold mb-1 ml-3">TASK LIST :</h3>
      <div className="task-container flex flex-wrap gap-4 p-4 border-[#dee2e680] border-2 rounded-xl bg-white">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card w-[100%] md:w-[32.4%] p-3 rounded-xl"
            style={{ backgroundColor: getBackgroundColor(task.status) }}
          >
            <h4 className="fonty2 font-bold">{task.title}</h4>
            <p className="fonty2 font-medium">{task.description}</p>
            <p className="fonty2 font-medium">
              Priority: <span>{task.priority}</span>
            </p>

            {editingTaskId !== task.id ? (
              <>
                <p className="fonty2 font-medium">Status: {task.status}</p>
                <p className="fonty2 font-medium">
                  Deadline: <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline set'}</span>
                </p>
                <p className="fonty2 font-medium">
                  Comments:
                  <ul>
                    {task.comment?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </p>
              </>
            ) : (
              <>
                <div>
                  <label>Status:</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="fonty2">
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label>Deadline:</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="fonty2"
                  />
                </div>
                <div>
                  <label>Comments:</label>
                  {comment.map((c, index) => (
                    <div key={index} className="my-2">
                      <input
                        type="text"
                        value={c}
                        onChange={(e) => handleCommentChange(index, e.target.value)}
                        className="fonty2 p-1 border rounded"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleAddComment}
                    className="fonty2 bg-[#333] mb-1 text-white px-3 py-1 rounded mt-2"
                  >
                    Add Comment
                  </button>
                </div>
              </>
            )}

            {editingTaskId !== task.id ? (
              <div className="mt-4">
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
