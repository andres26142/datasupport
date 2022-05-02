import { objectOf } from "prop-types";
import React, { useEffect, useState } from "react";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [table, setTAble] = useState("");

  useEffect(() => {
    let table;

    if (users.length != 0) {
      setTAble();
    } else {
      table = "";
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("https://datasupport.site/api/personas/clientes/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        let data = Object.values(json);
        setUsers(json);
      });
  };

  return (
    <div>
      <h3>Listado de usuarios</h3>
      <button onClick={handleSubmit}>Cargar usuarios</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cedula</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
