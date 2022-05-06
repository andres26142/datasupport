import React, { Component } from 'react';
import Form from './Form';
import FormServiciosPrestados from './FormServiciosPrestados';

const BolsaCliente = () => {

    
    return (
        <div className="container">
            <div className="row">
                <div className="col-7">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BolsaCliente;