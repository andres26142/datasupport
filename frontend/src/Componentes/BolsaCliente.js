import React, { Component } from 'react';
import FormBolsaCliente from './FormBolsaCliente';

const BolsaCliente = ({setserviciosPrestados, clientes, especialistas, servicios, serviciosPrestados, servicioPrestado, setservicioPrestado, BolsasCliente, setBolsasCliente, setBolsaClienteUpdated, BolsaxCliente, setBolsaxCliente}) => {

    let horasTotales = 0;
    if(servicios.hasOwnProperty('status') || clientes.hasOwnProperty('status') || especialistas.hasOwnProperty('status')){
        return(
            <div className='container'>
        <div className="col-6">
            <h2 style={{ textAlign: 'center' }}>Debe registrar primero clientes, especialistas y servicios para visualizar este modulo</h2>
            
        </div>
        </div>);
        
    }
    else if(BolsasCliente.hasOwnProperty('status')){
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
    else{
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

                    <div className="mb-2 col-3">
                        <label htmlFor="horasTotales" className="form-label">
                            Horas Totales:
                        </label>
                        <ul>
                        {
                            BolsasCliente.map(BolsalCliente => {
                                horasTotales += parseInt(BolsalCliente.horas);
                            })}
                            <li>{horasTotales} HORAS</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );}
}

export default BolsaCliente;