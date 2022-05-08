import React, { Fragment, useState, useEffect, setUsers } from "react";
import Navbar from "./Componentes/Navbar";
import Clientes from "./Componentes/Clientes";
import Especialistas from "./Componentes/Especialistas";
import Servicios from "./Componentes/Servicios";
import LoginForm from "./Componentes/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiciosPrestados from "./Componentes/ServiciosPrestados";
import BolsaCliente from "./Componentes/BolsaCliente";


function App() {
  //Para actualizar Cliente
  const [cliente, setCliente] = useState({
    cedula_ciudadania: "",
    nombre: "",
  });

  //Para actualizar Especialista
  const [especialista, setEspecialista] = useState({
    cedula_ciudadania: "",
    nombre: "",
    area: "",
  });

  //Para actualizar Servicio
  const [servicio, setServicio] = useState({
    nombre: "",
    descripcion: "",
  });

  //Para actualizar ServicioPrestado
  const [servicioPrestado, setservicioPrestado] = useState({
    cliente: 0,
    especialista: 0,
    servicio: 0,
    horas: "",
    descripcion: "",
    fecha: "",
  });

  //Para actualizar Bolsa x Horas
  const [BolsaxCliente, setBolsaxCliente] = useState({
    cliente: 0,
    fecha_inicio: "",
    fecha_final: "",
  });

  // Estado de cada uno
  const [clientes, setClientes] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [serviciosPrestados, setserviciosPrestados] = useState([])
  const [BolsasCliente, setBolsasCliente] = useState([])

  const [ClientesUpdated, setClientesUpdated] = useState(false);
  const [EspecialistasUpdated, setEspecialistasUpdated] = useState(false);
  const [ServiciosUpdated, setServiciosUpdated] = useState(false);
  const [serviciosPrestadosUpdated, setserviciosPrestadosUpdated] = useState(false);
  const [BolsaClienteUpdated, setBolsaClienteUpdated] = useState(false);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access") ? true : false
  );

  const handle_logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
  };

  const handle_login = (e, data) => {
    e.preventDefault();
    fetch("https://datasupport.site/api/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        } else if (res.status >= 401) {
          throw new Error("Invalid Credentials!");
          this.state({
            error: "Ha ocurrido un error",
          });
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem("access", json.access);
        localStorage.setItem("refresh", json.refresh);
        setLoggedIn(true);
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
  };

  // Clientes GET
  /*
  useEffect(() => {
      const getClientes = () => {
        console.log(loggedIn);
        fetch("https://datasupport.site/api/personas/clientes/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if(res.status=="401"){
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setClientes(res));
      };
      getClientes();
      setClientesUpdated(false);
    }, [ClientesUpdated]);
    */
  useEffect(() => {
    if (localStorage.getItem("access")) {
      const getClientes = () => {
        console.log(loggedIn);
        fetch("https://datasupport.site/api/personas/clientes/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if (res.status == "401") {
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setClientes(res));
      };
      getClientes();
      setClientesUpdated(false);

      const getEspecialistas = () => {
        fetch("https://datasupport.site/api/personas/especialistas/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if (res.status == "401") {
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setEspecialistas(res));
      };
      getEspecialistas();
      setEspecialistasUpdated(false);

      const getServicios = () => {
        fetch("https://datasupport.site/api/servicios/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if (res.status == "401") {
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setServicios(res));
      };
      getServicios();
      setServiciosUpdated(false);

      //GET SERVICIOS PRESTADOS

      const getServiciosPrestados = () => {
        console.log(loggedIn);
        fetch("https://datasupport.site/api/servicios/tecnico/listar/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if (res.status == "401") {
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setserviciosPrestados(res));
      };
      getServiciosPrestados();
      setserviciosPrestadosUpdated(false);

      // GET BOLSA CLIENTE
      const getBolsasCliente = () => {
        console.log(loggedIn);
        fetch("https://datasupport.site/api/servicios/tecnico/listar/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
          .then((res) => {
            if (res.status == "401") {
              handle_logout();
            }

            return res.json();
          })
          .then((res) => setBolsasCliente(res));
      };
      getBolsasCliente();
      setBolsaClienteUpdated(false);
    }
  }, [ClientesUpdated, EspecialistasUpdated, ServiciosUpdated, serviciosPrestadosUpdated, BolsaClienteUpdated]);



  return (
    <div className="App">
      <LoginForm
        handle_logout={handle_logout}
        handle_login={handle_login}
        loggedIn={loggedIn}
      ></LoginForm>
      {loggedIn && localStorage.getItem("access") ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route
                path="Clientes"
                element={
                  <Clientes
                    clientes={clientes}
                    cliente={cliente}
                    setCliente={setCliente}
                    setClientesUpdated={setClientesUpdated}
                  />
                }
              />
              <Route
                path="Especialistas"
                element={
                  <Especialistas
                    especialistas={especialistas}
                    especialista={especialista}
                    setEspecialista={setEspecialista}
                    setEspecialistasUpdated={setEspecialistasUpdated}
                  />
                }
              />
              <Route
                path="Servicios"
                element={
                  <Servicios
                    servicios={servicios}
                    servicio={servicio}
                    setServicio={setServicio}
                    setServiciosUpdated={setServiciosUpdated}
                  />
                }
              />
               <Route
                path="ServiciosPrestados"
                element={
                  <ServiciosPrestados
                    serviciosPrestados={serviciosPrestados}
                    setserviciosPrestados={setserviciosPrestados}
                    clientes={clientes}
                    servicios={servicios}
                    especialistas={especialistas}
                    servicioPrestado={servicioPrestado}
                    setservicioPrestado={setservicioPrestado}
                    setserviciosPrestadosUpdated={setserviciosPrestadosUpdated}
                  />
                }
              />
              <Route
                path="BolsaCliente"
                element={
                  <BolsaCliente
                  clientes={clientes} 
                  especialistas={especialistas}
                  servicios={servicios}
                  serviciosPrestados={serviciosPrestados}
                  setserviciosPrestados={setserviciosPrestados}
                  servicioPrestado={servicioPrestado}
                  BolsasCliente={BolsasCliente}
                  setBolsasCliente={setBolsasCliente}
                  BolsaxCliente={BolsaxCliente}
                  setBolsaxCliente={setBolsaxCliente}
                  setBolsaClienteUpdated={setBolsaClienteUpdated}
                />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : null}
    </div>
  );
}

export default App;

