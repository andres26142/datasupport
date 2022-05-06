import React, { Component } from 'react';
import FormBolsaCliente from './FormBolsaCliente';

const BolsaCliente = ({setserviciosPrestados, clientes, especialistas, servicios, serviciosPrestados, servicioPrestado, setservicioPrestado, BolsasCliente, setBolsasCliente, setBolsaClienteUpdated, BolsaxCliente, setBolsaxCliente}) => {
    console.log(serviciosPrestados)

    const handler =()=>{
        
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="col-4">
                        <h2 style={{ textAlign: 'center' }}>Bolsa Clientes</h2>
                        <FormBolsaCliente
                            clientes={clientes} 
                            especialistas={especialistas}
                            servicios={servicios}
                            serviciosPrestados={serviciosPrestados}
                            servicioPrestado={servicioPrestado}
                            BolsasCliente={BolsasCliente}
                            setBolsasCliente={setBolsasCliente}
                            BolsaxCliente={BolsaxCliente}
                            setBolsaxCliente={setBolsaxCliente}
                            setBolsaClienteUpdated={setBolsaClienteUpdated}
                            setserviciosPrestados={setserviciosPrestados}
                        />
                    </div>
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
                            {
                            serviciosPrestados.map(servicioPrestado => {
                                return (
                                    <tr key={servicioPrestado.id}>
                                        <td>{servicioPrestado.id}</td>
                                        <td>{servicioPrestado.cliente.nombre}</td>
                                        <td>{servicioPrestado.especialista.nombre}</td>
                                        <td>{servicioPrestado.servicio.nombre}</td>
                                        <td>{servicioPrestado.horas}</td>
                                        <td>{servicioPrestado.descripcion}</td>
                                        <td>{servicioPrestado.fecha}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BolsaCliente;