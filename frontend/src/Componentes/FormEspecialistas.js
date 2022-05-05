import React from 'react';

const FormEspecialistas = ({especialista, setEspecialista}) => {

    const handleChange = e => {
        setEspecialista({
            ...especialista,
            [e.target.name]: e.target.value
        })
    }

    let {cedula_ciudadania, nombre, area} = especialista
    const handleSubmit = () => {
        //Validacion de datos
        if (cedula_ciudadania === "" || nombre === "" || area === "") {
            alert('Todos los campos son obligatorios...')
            return
        }

        //consulta
        fetch("https://datasupport.site/api/personas/especialistas/create/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(especialista)     
        })
            .then(res => res.json())
            .then(res => console.log(res))

        setEspecialista({
            cedula_ciudadania: "",
            nombre: "",
            area: ""
        })

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="cedula" className="form-label">Cédula:</label>
                <input name="cedula_ciudadania" onChange={handleChange} type="text" id="cedula" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input name="nombre" onChange={handleChange} type="text" id="nombre" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="area" className="form-label">Área:</label>
                <input name="area" onChange={handleChange} type="text" id="area" className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary">Añadir</button>
        </form>
    );
}

export default FormEspecialistas;