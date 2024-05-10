// EditModal.js

import React, { useState } from 'react';
import axios from 'axios';
import "./EditModal.css"
import { REACT_API } from '../api';

const EditModal = ({ task, onClose, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = useState(task);
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true)
            await axios.put(`${REACT_API}/api/tasks/${task._id}`, updatedTask);
            onUpdate(updatedTask);
            setLoading(false)
            onClose();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Task</h2>
                <label>Title:</label>
                <input type="text" name="title" value={updatedTask.title} onChange={handleInputChange} />
                <label>Description:</label>
                <textarea name="description" value={updatedTask.description} onChange={handleInputChange}></textarea>
                <label>Due Date:</label>
                <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleInputChange} />
                <button className='updateTask' onClick={handleUpdate}>{loading ? "..." : "Update Task"}</button>
            </div>
        </div>
    );
};

export default EditModal;
