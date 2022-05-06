import React, {Component} from 'react';
import Form from './Form';

const Clientes = ({clientes, cliente, setCliente, setClientesUpdated}) => {

    const handleDelete = id => {
      const requestInit = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
      fetch("https://datasupport.site/api/personas/clientes/delete/"+id+"/", requestInit)
      .then(res => res.text())
      .then(res => console.log(res))


      setClientesUpdated(true)
    }

    let {cedula_ciudadania, nombre} = cliente
    const handleUpdate = id => {
      if (cedula_ciudadania === "" || nombre === "") {
        alert('Todos los campos son obligatorios...')
        return
      }

      fetch("https://datasupport.site/api/personas/clientes/update/"+id+"/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      })
        .then(res => res.json())
        .then(res => console.log(res))


      setClientesUpdated(true)
    }
      return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CEDULA</th>
                  <th>NOMBRE</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => {
                  return (
                  <tr key = {cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.cedula_ciudadania}</td>
                    <td>{cliente.nombre}</td>
                    <td>
                          <div className="mb-3">
                            <button onClick={() => handleDelete(cliente.id)} className="btn btn-danger">Eliminar</button>
                          </div>
                          <div className="mb-3">
                            <button onClick={() => handleUpdate(cliente.id)} className="btn btn-dark">Actualizar</button>
                          </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>

          <div className="col-5">
            <h2 style = {{textAlign: 'center'}}>Formulario Cliente</h2>
            <Form cliente={cliente} setCliente={setCliente}/>
          </div>
        </div>
      </div>
    );
}

export default Clientes;




