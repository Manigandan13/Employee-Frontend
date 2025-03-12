import React, { useContext, useState } from 'react'
import DataContext from './DataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {format} from 'date-fns'
import "./AddEmployee.css"
import Toast from './Toast'
import api from '../api/api'

  const AddEmployee = () => {
    const {getData}  = useContext(DataContext);
    const [toast, setToast] = useState({ message: '', type: '' });
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if(name=="dob"){
        const datevalue = format(value,"dd-MM-yyyy");
        setEmployee((prevState) => ({
          ...prevState,
          [name]: datevalue,
        }));
        console.log(datevalue);
      }
      else{
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
    formDatas.append("imageFile", image);

    api
      .post("/api/employees", formDatas , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setEmployee({
          id: '',
          name: '',
          emailId: '',
          mobileNumber: '',
          gender: '',
          payScale: '',
          dob: '',
          role: '',
          panNumber: '',
          image: '',
        });
        setImage(null);
        setToast({ message: 'Employee added successfully', type: 'success' });
        navigate("/")
      }).catch((error)=>{
        setToast({ message: error.message, type: 'error' });
      });
      
    }
  
    return (
      <div className="form-container">
        <h2>Employee Registration Form</h2>
        <form onSubmit={handleSubmit} className="form">
  
          <div className="form-group">
            <label htmlFor="name">Employee Name</label>
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
              maxLength={10}
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
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
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
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="image" style={{color:'blue',fontWeight:'bold'}}>Image Must be lesser than 2MB</label>
          </div>
  
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      </div>
    );
  };
  
export default AddEmployee;