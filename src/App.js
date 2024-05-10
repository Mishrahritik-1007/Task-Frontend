// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import "./App.css"
import { REACT_API } from './api'

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${REACT_API}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  return (
    <div className="app">
      <header>
        <h1 className='heading'>Task Management</h1>
      </header>
      <main>
        <TaskForm tasks={tasks} setTasks={setTasks} />
        {tasks.length > 0 && <TaskList tasks={tasks} setTasks={setTasks} />}
      </main>
    </div>
  );
};

export default App;
