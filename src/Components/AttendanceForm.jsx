import React, { useState } from 'react';
import axios from 'axios';
import "./AttendanceForm.css"
import api from '../api/api'
import Toast from './Toast'

const AttendanceForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [status, setStatus] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    const handleSubmit = async(e) => {
        e.preventDefault();

        await api
            .post(`api/attendance/mark/${employeeId}?status=${status}`)
            .then((response) => {
                setToast({ message: 'Attendance marked successfully!', type: 'success' });
            })
            .catch((error) => {
                setToast({ message: error.message, type: 'error' });
            });
    };

    return (
        <div className="form-container-1">
            <h2 id="mark-attendance-title">Mark Attendance</h2>
            <form onSubmit={handleSubmit} id="attendance-form">
                <label htmlFor="employeeId" id="employee-id-label">Employee ID:</label>
                <input
                    type="number"
                    id="employee-id-input"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
                <label htmlFor="status" id="attendance-status-label">Status:</label>
                <select
                    id="attendance-status-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value === 'true')}
                >
                    <option value="true">Present</option>
                    <option value="false">Absent</option>
                </select>
                <button type="submit" id="submit-button">Mark Attendance</button>
            </form>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        </div>
    );
};

export default AttendanceForm;
