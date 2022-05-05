import React from 'react';

const FormServicio = ({servicio, setServicio}) => {

    const handleChange = e => {
        setServicio({
            ...servicio,
            [e.target.name]: e.target.value
        })
    }

    let {nombre, descripcion} = servicio
    const handleSubmit = () => {
        //Validacion de datos
        if (nombre === "" || descripcion === "") {
            alert('Todos los campos son obligatorios...')
            return
        }

        //consulta
        fetch("https://datasupport.site/api/servicios/create/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicio)     
        })
            .then(res => res.json())
            .then(res => console.log(res))

        setServicio({
            nombre: "",
            descripcion: ""
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input name="nombre" onChange={handleChange} type="text" id="nombre" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción:</label>
                <input name="descripcion" onChange={handleChange} type="text" id="descripcion" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary">Añadir</button>
        </form>
    );
}

export default FormServicio;