import React from 'react';
import FormServicio from './FormServicio';
const Servicios = ({servicios, servicio, setServicio, setServiciosUpdated}) => {

  const handleDelete = id => {
    const requestInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
    fetch("https://datasupport.site/api/servicios/delete/"+id+"/", requestInit)
    .then(res => res.text())
    .then(res => console.log(res))
    setServiciosUpdated(true)
  }

  let {nombre, descripcion} = servicio
    const handleUpdate = id => {
      if (nombre === "" || descripcion === "") {
        alert('Todos los campos son obligatorios...')
        return
      }
      fetch("https://datasupport.site/api/servicios/update/"+id+"/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicio)
      })
        .then(res => res.json())
        .then(res => console.log(res))

      setServiciosUpdated(true)
    }
    return (
        <div className="container">
        <div className="row">
          <div className="col-7">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCION</th>
                </tr>
              </thead>
              <tbody>
              {servicios.map(servicio => {
                  return (
                  <tr key = {servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.descripcion}</td>
                    <td>
                          <div className="mb-3">
                            <button onClick={() => handleDelete(servicio.id)} className="btn btn-danger">Eliminar</button>
                          </div>
                          <div className="mb-3">
                            <button onClick={() => handleUpdate(servicio.id)} className="btn btn-dark">Actualizar</button>
                          </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          <div className="col-5">
            <h2 style = {{textAlign: 'center'}}>Formulario Servicio</h2>
            <FormServicio servicio={servicio} setServicio={setServicio}/>
          </div>
        </div>
      </div>
    );
}
export default Servicios;