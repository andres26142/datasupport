import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch("https://datasupport.site/api/personas/clientes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("access", json.access);
        localStorage.setItem("refresh", json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: "",
          username: json.username,
        });
      });
  };

  const handleChangeUser = (evt) => {
    setUser(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeUser}
          name="user"
          type="text"
          value={user}
        ></input>
        <input
          onChange={handleChangePassword}
          name="password"
          type="password"
          value={password}
        ></input>
        <input type="submit" value="Enviar"></input>
      </form>
    </div>
  );
}
