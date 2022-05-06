import React from 'react';
import {Navbar, Nav, Container} from "react-bootstrap"
import {Outlet, Link} from "react-router-dom"

const NavbarPage = () => {
    return ( 
        <>
            <Navbar className="navbar navbar-dark bg-dark" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as = {Link} to="/">DATA SUPPORT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as = {Link} to="/Clientes">Clientes</Nav.Link>
                            <Nav.Link as = {Link} to="/Especialistas">Especialistas</Nav.Link>
                            <Nav.Link as = {Link} to="/Servicios">Servicios</Nav.Link> 
                            <Nav.Link as = {Link} to="/ServiciosPrestados">ServiciosPrestados</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </>


        /*
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a href="#!" className="navbar-brand">Data Support</a>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                </ul>
            </div>
        </nav>
        */
     );
}
 
export default NavbarPage;