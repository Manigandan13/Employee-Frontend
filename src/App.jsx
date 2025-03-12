import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Headers from './Components/Headers'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Data from './Components/DataContext'
import Home from './Components/Home'

import './App.css'
import AddEmployee from './Components/AddEmployee'
import Missing from './Components/Missing'
import UpdateProduct from './Components/EmployeeUpdate'
import AttendancePage from './Components/AttendancePage'
import PayrollPage from './Components/PayrollPage'
import EmployeeDetails from './Components/EmployeeDetails'
import EmployeeUpdate from './Components/EmployeeUpdate'

function App() {

  return (
    <div>
      <Headers/>
      <Routes>
        <Route path="/add" element={<AddEmployee/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/attendance" element={<AttendancePage/>} />
        <Route path="/employee/:id" >
        <Route index element={<EmployeeDetails/>}/>
        <Route path="update" element={<EmployeeUpdate/>}/>
        </Route>
        <Route path="*" element={<Missing/>} />
        <Route path="/payroll" element={<PayrollPage/>} />
      </Routes>
    </div>
  )
}

export default App
