import React, { useContext, useEffect, useState } from 'react'
import DataContext from './DataContext'
import { Link, useNavigate } from 'react-router-dom';
import EmployeeCard from './EmployeeCard';
import axios from 'axios';
import api from '../api/api'

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeImages, setEmployeeImages] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get('/api/employees');
        setEmployees(response.data);

        await response.data.forEach((employee) => {
          if (employee.image) {
            fetchImage(employee.id);
          }
        });
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    const fetchImage = async (employeeId) => {
      try {
        const response = await api.get(
          `/api/employees/${employeeId}/image`,
          { responseType: 'blob' }
        );
        setEmployeeImages((prevImages) => ({
          ...prevImages,
          [employeeId]: URL.createObjectURL(response.data),
        }));
      } catch (error) {
        console.error(`Error fetching image for employee ${employeeId}:`, error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleClick = (id) => {
    navigator(`/employee/${id}`);
  };

  return (
    <div className="home-container">
      <h1 className="heading">Welcome to the Home Page</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Image</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Email ID</th>
            <th>Employee Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="table-row" onClick={() => handleClick(employee.id)}>
              <EmployeeCard
                employee={employee}
                imageUrl={employeeImages[employee.id]}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Home