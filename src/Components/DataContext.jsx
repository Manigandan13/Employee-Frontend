import React, {  createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const DataContext = createContext()

export const Data = (props)=>
{

  const [Detail,setDetail] = useState([]);
  const count = useRef(0);

  async function getData()
  {
    const response = await axios.get("http://localhost:8080/api/employees");
    setDetail(response.data);
    console.log(response.data)
  }
  useEffect(()=>{
    getData();
  },[count])

  return(
    <>
    <DataContext.Provider value={{Detail,setDetail,count,getData}}>
      {props.children}
    </DataContext.Provider>
    </>
  )
}
export default DataContext
