import React, { useState } from 'react';
import axios from 'axios';
import "./PayrollPage.css"

function PayrollPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [daysWorked, setDaysWorked] = useState(null);
  const [totalPay, setTotalPay] = useState(null);
  const [error, setError] = useState(null);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const calculateDaysWorked = async () => {
    setError(null);
    setDaysWorked(null);
    setTotalPay(null);

    try {
      const response = await api.get(`/api/payroll/days/${employeeId}`);
      setDaysWorked(response.data); // Assuming the response has daysWorked
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const calculatePay = async () => {
    setError(null);
    setTotalPay(null);

    try {
      const response = await api.get(`/api/payroll/pay/${employeeId}`);
      setTotalPay(response.data); // Assuming the response has totalPay
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const handleReset = () => {
    setEmployeeId('');
    setDaysWorked(null);
    setTotalPay(null);
    setError(null);
  };

  return (
    <div className='p-c'>
    <div className='payroll-container'>
      <h2>Payroll Calculator</h2>
      <div className='payroll-container-2'>
        <label>
          Employee ID:
          <input
            className='pay-inp'
            type="text"
            value={employeeId}
            onChange={handleEmployeeIdChange}
          />
        </label>
      </div>
      <div className='payroll-container-1'>
        <button onClick={calculateDaysWorked} className='p-btn'>Get Days Worked</button>
        <button onClick={calculatePay} className='p-btn'>Calculate Pay</button>
        <button onClick={handleReset} className='p-btn'>Reset</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {daysWorked !== null && (
        <div>
          <p className='pt'>Days Worked: {daysWorked}</p>
        </div>
      )}

      {totalPay !== null && (
        <div>
          <p className='pt'>Total Pay:&#8377;{totalPay}</p>
        </div>
      )}

    </div>
    </div>
  );
}

export default PayrollPage;
