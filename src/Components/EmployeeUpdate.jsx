import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import DataContext from './DataContext';
import Toast from './Toast';
import api from '../api/api'


const EmployeeUpdate = () => {
    const {id} = useParams();
    const [imageUrl,setImageUrl]= useState();
    const [employee, setEmployee] = useState({
      id: '',
      name: '',
      emailId: '',
      mobileNumber: '',
      gender: '',
      payScale: '',
      dob: '',
      role: '',
      panNumber: '',
      image:'',
    });
    const [image, setImage] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await api.get(
              `/api/employees/${id}`
            );
            setEmployee(response.data);
            if (response.data.image) {
                fetchImage()
            }
          } catch (error) {
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      setImage(e.target.files[0]);
    };
    const navigate = useNavigate();
  
    const handleSubmit= async (e)=>{
      e.preventDefault();
    const formDatas = new FormData();
    
    formDatas.append(
      "employee",
      new Blob([JSON.stringify(employee)], { type: "application/json" })
    );
    if(image!=null){
    formDatas.append("imageFile", image);
    }

    api
      .post("/api/employees", formDatas , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setToast({ message: 'Employee Updated successfully', type: 'success' });
        navigate("/")
      })
      .catch((error) => {
        setToast({ message: error.message, type: 'error' });
      });
    }
  
    return (
      <div className="form-container">
        <h2>Employee Update Form</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={employee.id}
              onChange={handleChange}
              required
              disabled={true}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="emailId">Email ID</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={employee.emailId}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={employee.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={employee.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
  
          <div className="form-group">
            <label htmlFor="payScale">Pay Scale</label>
            <input
              type="text"
              id="payScale"
              name="payScale"
              value={employee.payScale}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              value={employee.role}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="panNumber">PAN Number</label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={employee.panNumber}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="image">Profile Image</label>
            <img src={imageUrl} width={100} />
            </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
  
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      </div>
    );
  };

export default EmployeeUpdate;
