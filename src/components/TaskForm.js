import React, { useEffect, useState } from 'react'
import "./TaskForm.css"
import axios from 'axios';
import { REACT_API } from '../api';
const TaskForm = ({ setTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [disableAdd, setDisableAdd] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (title.length > 0 && description.length > 0 && dueDate.length > 0) {
            setDisableAdd(false)
        }
    }, [title, description, dueDate])

    const addTask = async (newTask) => {
        try {
            setLoading(true)
            const response = await axios.post(`${REACT_API}/api/tasks`, newTask);
            setTasks(prev => [...prev, response.data]);
            setLoading(false)
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    const submitTask = async (e) => {
        e.preventDefault();
        addTask({ title, description, dueDate })
        setTitle("")
        setDescription("")
        setDueDate("")
        setDisableAdd(true)
    }
    return (
        <>
            <section class="task-form">
                <h2 className='addNewTask'>Add New Task</h2>
                <form id="addTaskForm">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="titleInput" placeholder="Task Title" required />
                    <textarea id="descriptionInput" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description"></textarea>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} id="dueDateInput" required />
                    <button disabled={disableAdd} className={disableAdd ? 'add disableAdd' : 'add'} type="submit" onClick={submitTask}>{loading ? "..." : "Add Task"}</button>
                </form>
            </section>
        </>
    )
}

export default TaskForm
