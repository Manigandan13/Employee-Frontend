import React from 'react';
import AttendanceForm from './AttendanceForm';
import EmployeeList from './EmployeeList';

function AttendancePage() {
  return (
    <div className="App">
      <h1 className='EAM-Heading'>Employee Attendance Management</h1>
      <AttendanceForm />
      <EmployeeList />
    </div>
  );
}

export default AttendancePage;
