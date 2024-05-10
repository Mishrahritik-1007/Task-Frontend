import React, { useState } from 'react'
import "./TaskList.css"
import EditModal from './EditModal'
import axios from 'axios'
import { REACT_API } from '../api'
const TaskList = ({ tasks, setTasks }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [editTask, setEditTask] = useState(null)

    const handleEditModal = (task) => {
        setEditTask(task)
        setShowEditModal(!showEditModal)
    }
    const onClose = () => {
        setShowEditModal(false);
    }
    const onUpdate = (updatedTask) => {
        const newTasks = tasks.map(task => {
            if (task._id === updatedTask._id) {
                return updatedTask
            }
            else {
                return task
            }
        })
        setTasks(newTasks)
    }

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${REACT_API}/api/tasks/${taskId}`);
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks)
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <>
            <section class="task-list">
                <h2>All Tasks</h2>
                {showEditModal && <EditModal task={editTask} onClose={onClose} onUpdate={onUpdate} />}
                <div className="taskList">
                    {tasks.map(task => (
                        <li li key={task._id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {`${new Date(task.dueDate).getDate()} ${new Date(task.dueDate).toLocaleString("en-us", { month: "short" })} ${new Date(task.dueDate).getFullYear()}`}</p>
                            <div className="task-actions">
                                <button className='edit' onClick={() => handleEditModal(task)}>Edit</button>
                                <button className="delete" onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </div>
            </section>
        </>
    )
}

export default TaskList
