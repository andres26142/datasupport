import React, { Component } from 'react';
import FormBolsaCliente from './FormBolsaCliente';

const BolsaCliente = ({setserviciosPrestados, clientes, especialistas, servicios, serviciosPrestados, servicioPrestado, setservicioPrestado, BolsasCliente, setBolsasCliente, setBolsaClienteUpdated, BolsaxCliente, setBolsaxCliente}) => {
    if(BolsasCliente.hasOwnProperty('status')){
        return(
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
                        
                    </table>
                </div>
            </div>
        </div>
        );
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
                            BolsasCliente.map(BolsaCliente => {
                                return (
                                    <tr key={BolsaCliente.id}>
                                        <td>{BolsaCliente.id}</td>
                                        <td>{BolsaCliente.cliente.nombre}</td>
                                        <td>{BolsaCliente.especialista.nombre}</td>
                                        <td>{BolsaCliente.servicio.nombre}</td>
                                        <td>{BolsaCliente.horas}</td>
                                        <td>{BolsaCliente.descripcion}</td>
                                        <td>{BolsaCliente.fecha}</td>
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