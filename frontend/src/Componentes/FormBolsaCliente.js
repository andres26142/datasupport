import React from "react";

const FormBolsaCliente = ({
    clientes,
    especialistas,
    servicios,
    serviciosPrestados,
    servicioPrestado,
    BolsasCliente,
    setBolsasCliente,
    BolsaxCliente,
    setBolsaxCliente,
    setBolsaClienteUpdated,
    setserviciosPrestados
}) => {
    const handleChange = (e) => {
        e.preventDefault();
        setBolsaxCliente({
            ...BolsaxCliente,
            [e.target.name]: e.target.value,
        })
    }

    let { cliente, fecha_inicio, fecha_final } = BolsaxCliente
    const handleSubmit = (e) => {
        e.preventDefault();
        //Validacion de datos
        if (fecha_inicio === "" || fecha_final === "") {
            alert("Todos los campos son obligatorios...")
            return
        }

        //consulta
        fetch("https://datasupport.site/api/servicios/tecnico/listar/?fecha_inicio="+fecha_inicio+"&fecha_final="+fecha_final+"&cliente="+cliente, { // ?fecha_inicio=2022-05-03&fecha_final=2022-05-07&cliente=38
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(fecha_final);
                setserviciosPrestados(res)
                return res.json();
            })
            .then((res) => console.log(res))
        setBolsaClienteUpdated(true)
        

        setBolsaxCliente({
            cliente: 0,
            fecha_inicio: "",
            fecha_inicio: "",
        })
    
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="clientes" className="form-label">
                    Cliente:
                </label>
                <select
                    onChange={handleChange}
                    name="cliente"
                    id="clientes"
                    className="form-control"
                >
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
                <label htmlFor="fechaInicio" className="form-label">
                    Fecha Inicio:
                </label>
                <input
                    name="fecha_inicio"
                    type="text"
                    onChange={handleChange}
                    placeholder="FORMATO YYYY-MM-DD"
                    className="form-control"
                ></input>
            </div>
            <div className="mb-2">
                <label htmlFor="fechaFin" className="form-label">
                    Fecha Fin:
                </label>
                <input
                    name="fecha_final"
                    type="text"
                    onChange={handleChange}
                    placeholder="FORMATO YYYY-MM-DD"
                    className="form-control"
                ></input>
            </div>
            <div className="mb-3">
                <button
                    className="btn btn-danger"
                >
                    Buscar
                </button>
            </div>
        </form>
    );
}

export default FormBolsaCliente;
