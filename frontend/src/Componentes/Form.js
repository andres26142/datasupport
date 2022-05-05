import React from 'react';

const Form = ({cliente, setCliente}) => {

    const handleChange = e => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    let {cedula_ciudadania, nombre} = cliente
    const handleSubmit = () => {
        //Validacion de datos
        if (cedula_ciudadania === "" || nombre === "") {
            alert('Todos los campos son obligatorios...')
            return
        }

        //consulta
        fetch("https://datasupport.site/api/personas/clientes/create/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)     
        })
            .then(res => res.json())
            .then(res => console.log(res))

        setCliente({
            cedula_ciudadania: "",
            nombre: ""
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

            <button type="submit" className="btn btn-primary">Añadir</button>
        </form>
    );
}

export default Form;