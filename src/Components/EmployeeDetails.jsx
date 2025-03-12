
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../api/api"
import Toast from './Toast'

const EmployeeDetails = () => {
  const [employee,setEmployee]=useState([{}]);
  const [imageUrl,setImageUrl]= useState();
  const {id} = useParams();
  const navigator = useNavigate();
  const [toast, setToast] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await api.get(
              `/api/employees/${id}`
            );
            setEmployee(response.data);
            if (response.data.image) {
              fetchImage();
            }
          } catch (error) {
            console.error("Error fetching Employee:", error);
          }
        };
    
        const fetchImage = async () => {
          const response = await api.get(
            `/api/employees/${id}/image`,
            { responseType: "blob" }
          );
          setImageUrl(URL.createObjectURL(response.data));
        };
    
        fetchEmployee();
      }, []);

    const handleUpdate = () => {
      navigator(`/employee/${id}/update`)
    };

     const handleDelete = async() => {
      await api.delete(
        `/api/employees/${id}`
      );
      setToast({ message: 'Employee Deleted successfully', type: 'success' });
      navigator("/")
    };

    return (
        <div className="employee-container">
            <div className="employee-card2">
                <div className="image-container">
                    <img src={imageUrl} alt="Employee" className="employee-image" />
                </div>
                <div className="employee-info">
                    <h2 className="employee-name">{employee.name}</h2>
                    <p><strong>Employee ID:</strong> {employee.id}</p>
                    <p><strong>Email:</strong> {employee.emailId}</p>
                    <p><strong>Mobile Number:</strong> {employee.mobileNumber}</p>
                    <p><strong>Gender:</strong> {employee.gender}</p>
                    <p><strong>Pay Scale:</strong> {employee.payScale}</p>
                    <p><strong>Date of Birth:</strong> {employee.dob}</p>
                    <p><strong>Role:</strong> {employee.role}</p>
                    <p><strong>PAN Number:</strong> {employee.panNumber}</p>
                </div>
                <div className="action-buttons">
                    <button className="update-button" onClick={handleUpdate}>Update</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        </div>
    );
};

export default EmployeeDetails;
