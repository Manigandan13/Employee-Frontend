import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeList.css'
import {format} from 'date-fns' 
import api from '../api/api'

const EmployeeList = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendanceByEmployee = async () => {
    try {
      const response = await api.get(`/api/attendance/employee/${employeeId}`);
      setAttendanceData(response.data);
    } catch (error) {
      alert('Error fetching attendance data');
    }
  };

  const fetchAttendanceByDate = async () => {
    const datevalue = format(date,"dd-MM-yyyy");
    try {
      const response = await api.get(`/api/attendance/date/${datevalue}`);
      setAttendanceData(response.data);
    } catch (error) {
      alert('Error fetching attendance data');
      console.log(error)
    }
  };

  const fetchAllAttendance = async () => {
    try {
      const response = await api.get('/api/attendance');
      setAttendanceData(response.data);
    } catch (error) {
      alert('Error fetching attendance data');
    }
  };

  return (
    <div className="attendance-list-container">
      <h2>View Attendance</h2>

      <div className="attendance-filters">
        <div className="filter">
          <label htmlFor="employeeId" className="label">Employee ID:</label>
          <input
            type="number"
            id="employee-id-input"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="input"
          />
          <button className="button" onClick={fetchAttendanceByEmployee}>View Attendance by Employee</button>
        </div>

        <div className="filter">
          <label htmlFor="date" className="label">Date:</label>
          <input
            type="date"
            id="attendance-date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
          <button className="button" onClick={fetchAttendanceByDate}>View Attendance by Date</button>
        </div>

        <div>
          <button className="button" onClick={fetchAllAttendance}>View All Attendance</button>
        </div>
      </div>

      <div className="attendance-results">
        {attendanceData.length===0 ? (
          <p>No attendance records found.</p>
        ) : (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.employeeId}</td>
                  <td>{attendance.employeeName}</td>
                  <td>{attendance.present ? 'Present' : 'Absent'}</td>
                  <td>{attendance.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;

