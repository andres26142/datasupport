import React, { Component } from 'react';
import Form from './Form';
import FormServiciosPrestados from './FormServiciosPrestados';

const ServiciosPrestados = ({ serviciosPrestados, setserviciosPrestados, clientes, servicios, especialistas, servicioPrestado, setservicioPrestado, setserviciosPrestadosUpdated}) => {

    const handleDelete = id => {
        const requestInit = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }
        fetch("https://datasupport.site/api/servicios/tecnico/eliminar/"+id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))


        setserviciosPrestadosUpdated(true)
    }

    let {cliente, especialista, servicio, horas, descripcion, fecha} = servicioPrestado
    const handleUpdate = id => {
        //Validacion de datos

        if (horas === "" || descripcion === "" || fecha ==="") {
            alert('Todos los campos son obligatorios...')
            return
        }

        //consulta
        fetch("https://datasupport.site/api/servicios/tecnico/actualizar/"+id, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicioPrestado)     
        })
            .then(res => res.json())
            .then(res => console.log(res))
        
        setserviciosPrestadosUpdated(true)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CLIENTE</th>
                                <th>ESPECIALISTA</th>
                                <th>SERVICIO</th>
                                <th>HORAS</th>
                                <th>DESCRIPCION</th>
                                <th>FECHA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviciosPrestados.map(servicioPrestado => {
                                return (
                                    <tr key={servicioPrestado.id}>
                                        <td>{servicioPrestado.id}</td>
                                        <td>{servicioPrestado.cliente.nombre}</td>
                                        <td>{servicioPrestado.especialista.nombre}</td>
                                        <td>{servicioPrestado.servicio.nombre}</td>
                                        <td>{servicioPrestado.horas}</td>
                                        <td>{servicioPrestado.descripcion}</td>
                                        <td>{servicioPrestado.fecha}</td>
                                        <td>
                                            <div className="mb-3">
                                                <button onClick={() => handleDelete(servicioPrestado.id)} className="btn btn-danger">Eliminar</button>
                                            </div>
                                            <div className="mb-3">
                                                <button onClick={() => handleUpdate(servicioPrestado.id)} className="btn btn-dark">Actualizar</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="col-4">
                    <h2 style={{ textAlign: 'center' }}>Formulario Servicios Prestados</h2>
                    <FormServiciosPrestados
                        servicio clientes={clientes}
                        servicios={servicios}
                        especialistas={especialistas}
                        servicioPrestado={servicioPrestado}
                        setservicioPrestado={setservicioPrestado}
                    />
                </div>
            </div>
        </div>
    );
}

export default ServiciosPrestados;