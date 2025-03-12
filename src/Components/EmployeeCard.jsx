import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee, imageUrl }) => {
  return (
    <>
      <td className="employee-image-1">
        {imageUrl ? (
          <img src={imageUrl} alt={`${employee.name}'s image`} width={50} />
        ) : (
          <p>No image available</p>
        )}
      </td>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.emailId}</td>
      <td>{employee.role}</td>
    </>
  );
};


export default EmployeeCard;
