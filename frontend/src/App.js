import React, { useState, useCallback } from "react";
import axios from 'axios';
import "./App.css";


const accesToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNzc3MjE4LCJpYXQiOjE2NTExNzcyNzgsImp0aSI6IjMxZGU5OWZhNzhlOTRlNTA4M2MyZDA4NDhlNmEzZjJjIiwidXNlcl9pZCI6Mn0.py6q-KpTPTKhT0_Tbt0GQ9P1VFNSNGu1qEU8Nk8fhwo';
const apiURL = 'https://datasupport.site/api/personas/clientes/';


const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    'Authorization': `Bearer ${accesToken}`
  }
})

function App() {
  const [users, setUsers] = useState([]);
  const [requestError, setRequestError] = useState();

  const fetchData = useCallback(async () => {
    try{
      const result = await authAxios.get(apiURL);
      setUsers(result.data);
    } catch (err){
      setRequestError(err.message);
    }
  });

  return (
    <div className="App">
      <button onClick={() => fetchData()}>Listar Clientes</button>
      <ul>
        {users.map(user => {
          return(
          <>
          <li>{user.id}</li>
          <li>{user.cedula_ciudadania}</li>
          <li>{user.nombre}</li>
          </>
          )
        })}
      </ul>
      {requestError && <p>{requestError}</p>}
    </div>
  );
}

export default App;
