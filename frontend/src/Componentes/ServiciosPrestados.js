import React, {Component} from 'react';
import Form from './Form';

const ServiciosPrestados = ({serviciosPrestados, setserviciosPrestados}) => {

   
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
                  <th>HORAS</th>
                  <th>DESCRIPCION</th>
                  <th>FECHA</th>
                  <th>SERVICIO</th>
                </tr>
              </thead>
              <tbody>
              {serviciosPrestados.map(servicioPrestado => {
                  return (
                  <tr key = {servicioPrestado.id}>
                    <td>{servicioPrestado.id}</td>
                    <td>Cliente</td>
                    <td>Especialista</td>
                    <td>{servicioPrestado.horas}</td>
                    <td>{servicioPrestado.descripcion}</td>
                    <td>{servicioPrestado.fecha}</td>
                    <td>Servicio</td>


                  </tr>
                )})}
              </tbody>
            </table>
          </div>

          <div className="col-5">
            <h2 style = {{textAlign: 'center'}}>Formulario Servicios Prestados</h2>
          </div>
        </div>
      </div>
    );
}

export default ServiciosPrestados;