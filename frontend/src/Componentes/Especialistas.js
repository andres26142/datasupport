import React from 'react';
import FormEspecialistas from './FormEspecialistas';
const Especialistas = ({especialistas, especialista, setEspecialista, setEspecialistasUpdated}) => {

  const handleDelete = id => {
    const requestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
    fetch("https://datasupport.site/api/personas/especialistas/delete/"+id+"/", requestInit)
    .then(res => res.text())
    .then(res => console.log(res))
    setEspecialistasUpdated(true)
  }

  let {cedula_ciudadania, nombre, area} = especialista
    const handleUpdate = id => {
      if (cedula_ciudadania === "" || nombre === "" || area === "") {
        alert('Todos los campos son obligatorios...')
        return
      }

      fetch("https://datasupport.site/api/personas/especialistas/update/"+id+"/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(especialista)
      })
        .then(res => res.json())
        .then(res => console.log(res))


      setEspecialistasUpdated(true)
    }
    return (
        <div className="container">
        <div className="row">
          <div className="col-7">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CEDULA</th>
                  <th>NOMBRE</th>
                  <th>AREA</th>
                </tr>
              </thead>
              <tbody>
              {especialistas.map(especialista => {
                  return (
                  <tr key = {especialista.id}>
                    <td>{especialista.id}</td>
                    <td>{especialista.cedula_ciudadania}</td>
                    <td>{especialista.nombre}</td>
                    <td>{especialista.area}</td>
                    <td>
                          <div className="mb-3">
                            <button onClick={() => handleDelete(especialista.id)} className="btn btn-danger">Eliminar</button>
                          </div>
                          <div className="mb-3">
                            <button onClick={() => handleUpdate(especialista.id)} className="btn btn-dark">Actualizar</button>
                          </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          <div className="col-5">
            <h2 style = {{textAlign: 'center'}}>Formulario Especialista</h2>
            <FormEspecialistas especialista={especialista} setEspecialista={setEspecialista}/>
          </div>
        </div>
      </div>
    );
}
export default Especialistas;