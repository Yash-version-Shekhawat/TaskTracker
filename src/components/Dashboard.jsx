import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import '../styles/Styles.css';
import img from '../assets/bg-oo1.png'
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ todo: 0, inProgress: 0, completed: 0 });
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    sortByDeadline: false,
  });
  const updateTaskCounts = () => {
    const todoCount = tasks.filter(task => task.status === 'To Do').length;
    const inProgressCount = tasks.filter(task => task.status === 'In Progress').length;
    const completedCount = tasks.filter(task => task.status === 'Completed').length;

    setTaskCounts({ todo: todoCount, inProgress: inProgressCount, completed: completedCount });
  };
  useEffect(() => {
    updateTaskCounts();
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const filteredTasks = tasks
    .filter((task) =>
      filters.priority ? task.priority === filters.priority : true
    )
    .filter((task) =>
      filters.status ? task.status === filters.status : true
    )
    .sort((a, b) => {
      if (filters.sortByDeadline) {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

  return (
    <div className='w-full'>
      <h2 className='fonty1 p-3 text-[35px]'>To Do<span className='text-[#a06cd5]'>IT.</span></h2>
      <div className='w-full md:flex'>
      <div className='bg-[#dee2e680] md:w-[67.3%] p-2 px-3 rounded-md mx-4'>
        <h2 className='fonty2 font-extrabold'>ADD TASK :</h2>
        <TaskForm onAddTask={addTask} />
      </div>
      <div 
        className='hidden md:block w-[29%] 2xl:w-[30%] h-[18.6rem] p-3 px-3 rounded-md mx-4 md:absolute right-0'
        style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
        <h3 className='fonty2 font-extrabold mb-1 text-3xl'>Hi there,</h3>
        <h3 className='fonty2 font-medium mb-1 text-lg'>Your Task Summary :</h3>
        <div className='flex flex-col gap-2 items-center mt-3'>
        <div className='bg-[#ffffff80] w-[12vw] flex flex-col items-center p-2 py-3 rounded-lg backdrop-blur-md border-white border-[1px]'><span className='fonty2 font-medium'>To Do</span><span className='fonty2 font'>{taskCounts.todo}</span></div>
        <div className='flex gap-2'>
        <div className='bg-[#ffffff80] w-[12vw] flex flex-col items-center p-2 py-3 rounded-lg backdrop-blur-md border-[1px]'><span className='fonty2 font-medium'>In Progress</span><span className='fonty2 font'>{taskCounts.inProgress}</span></div>
        <div className='bg-[#ffffff80] w-[12vw] flex flex-col items-center p-2 py-3 rounded-lg backdrop-blur-md border-[1px]'><span className='fonty2 font-medium'>Completed</span> <span className='fonty2 font'>{taskCounts.completed}</span></div>
        </div>
        </div>
        
      </div>
      </div>
      

      <div className='bg-[#dee2e680] md:w-[67.3%] p-2 px-3 rounded-md mx-4 my-3'>
        <h3 className='fonty2 font-extrabold mb-1'>FILTER TASKS :</h3>
        <label>
          <span className='fonty2 font-medium '>Priority :</span>
          <select className='fonty2 p-2 rounded-md mx-2 w-[23.5%] md:w-auto' name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Low" className='bg-[#d7c8f3]'>Low</option>
            <option value="Medium" className='bg-[#d0bef2]'>Medium</option>
            <option value="High" className='bg-[#c0a7eb]'>High</option>
          </select>
        </label>
        <label>
          <span className='fonty2 font-medium '>Status :</span>
          <select className='fonty2 p-2 rounded-md mx-2 w-[23.5%] md:w-auto' name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="To Do" className='bg-[#ffadad]'>To Do</option>
            <option value="In Progress" className='bg-[#ffd6a5]'>In Progress</option>
            <option value="Completed" className='bg-[#caffbf]'>Completed</option>
          </select>
        </label>
        <label className='fonty2'>
          <input
            className='mt-3 md:mt-0 '
            type="checkbox"
            name="sortByDeadline"
            checked={filters.sortByDeadline}
            onChange={handleFilterChange}
          />
          Sort by Nearest Deadline
        </label>
      </div>

      <TaskList tasks={filteredTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
    </div>
  );
};

export default Dashboard;
