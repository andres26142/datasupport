import React from "react";

const FormServiciosPrestados = ({ clientes, servicios, especialistas, servicioPrestado, setservicioPrestado }) => {

    const handleChange = (e) => {
        e.preventDefault();
        setservicioPrestado({
            ...servicioPrestado,
            [e.target.name]: e.target.value
        })
    }

    let {cliente, especialista, servicio, horas, descripcion, fecha} = servicioPrestado
    const handleSubmit = () => {
        //Validacion de datos

        if (horas === "" || descripcion === "" || fecha ==="") {
            alert('Todos los campos son obligatorios...')
            return
        }

        //consulta
        fetch("https://datasupport.site/api/servicios/tecnico/registrar/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicioPrestado)     
        })
            .then(res => res.json())
            .then(res => console.log(res))

        setservicioPrestado({
            cliente: 0,
            especialista: 0,
            servicio: 0,
            horas: "",
            descripcion: "",
            fecha: "",
        })
    }
        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="clientes" className="form-label">
                        Cliente:
                    </label>
                    <select onChange={handleChange} name="cliente" id="clientes" className="form-control" >
                    <option value="0">Seleccione Cliente</option>
                        {clientes.map((cliente) => {
                            return (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="mb-2">
                    <label htmlFor="especialistas" className="form-label">
                        Especialista:
                    </label>
                    <select onChange={handleChange} name="especialista" id="especialistas" className="form-control" >
                    <option value="0">Seleccione Especialista</option>
                        {especialistas.map((especialista) => {
                            return (
                                <option key={especialista.id} value={especialista.id}>
                                    {especialista.nombre}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="mb-2">
                    <label htmlFor="servicios" className="form-label">
                        Servicio:
                    </label>
                    <select onChange={handleChange} name="servicio" id="servicios" className="form-control" >
                    <option value="0">Seleccione Servicio</option>
                        {servicios.map((servicio) => {
                            return (
                                <option key={servicio.id} value={servicio.id}>
                                    {servicio.nombre}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="mb-2">
                    <label htmlFor="horas" className="form-label">Horas:</label>
                    <input name="horas" type="text" onChange={handleChange} className="form-control" ></input>
                </div>

                <div className="mb-2">
                    <label htmlFor="descripcion" className="form-label">Descripción:</label>
                    <input name="descripcion" type="text" onChange={handleChange} className="form-control" ></input>
                </div>


                <div className="mb-2">
                    <label htmlFor="anio" className="form-label">Fecha:</label>
                    <input name="fecha" type="text" onChange={handleChange} placeholder="FORMATO YYYY-MM-DD" className="form-control"></input>
                </div>
                <button type="submit" className="btn btn-primary">Añadir</button>
            </form>
        );
}

export default FormServiciosPrestados;
