import React, { Component } from "react";

let username = null;
class ListUsers2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  render() {
    const handleGetClients = (evt) => {
      evt.preventDefault();
      fetch("https://datasupport.site/api/personas/clientes/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code == "token_not_valid") {
              this.props.handler();
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
          } else {
            this.setState({
              users: json,
            });
          }
        });
    };

    const test = (evt) => {
      let users = this.state.users;
      return users.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td>{item.id}</td>
          </tr>
        );
      });
    };

    return (
      <div>
        <h3>Listado de usuarios2</h3>
        <button onClick={handleGetClients}>Cargar usuarios</button>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cedula</th>
            </tr>
          </thead>
          <tbody>{this.state.users == null ? null : test()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListUsers2;
