import { useState } from 'react';
import add from '../assets/add-button.png'
const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('To Do');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      status,
      deadline,  
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('To Do');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className=' border-2 rounded-lg p-1 pt-4'>
      <div className='md:flex justify-center'>
      <input
        className='p-2 rounded-lg mr-1 fonty2 w-full md:w-[15vw] 2xl:w-[15vw]'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className='p-2 rounded-lg mr-1 fonty2 w-full md:w-[15vw] 2xl:w-[15vw] mt-2 md:mt-0'
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select 
        className='py-[0.68rem] px-1 rounded-lg mr-2 md:mr-1 fonty2 w-[48.5%] md:w-[8vw] 2xl:w-[10vw] mt-2 md:mt-0'
        value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low" className='bg-[#d7c8f3]'>Low</option>
        <option value="Medium" className='bg-[#d0bef2]'>Medium</option>
        <option value="High" className='bg-[#c0a7eb]'>High</option>
      </select>
      <select
        className='py-[0.68rem] px-1 rounded-lg md:mr-1 fonty2 w-[48.5%] md:w-[9vw] 2xl:w-[10vw] mt-2 md:mt-0'
        value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do" className='bg-[#ffadad]'>To Do</option>
        <option value="In Progress" className='bg-[#ffd6a5]'>In Progress</option>
        <option value="Completed" className='bg-[#caffbf]'>Completed</option>
      </select>
      <input
        className='py-[0.48rem] px-1 rounded-lg fonty2 mt-2 md:mt-0 w-full md:w-[15vw] 2xl:w-[14vw]'
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Deadline"
      />
      </div>
      <div className='flex justify-center '>
      <button type="submit" className='bg-[#a06cd5] px-3 py-3 ml-3 mt-2 rounded-full text-white flex gap-1'>
        <img src={add} className='h-7'/>
        <h1 className='pt-[3px] fonty2 text-[15px]'>Add Task</h1>
      </button>
      </div>
      
    </form>
  );
};

export default TaskForm;
