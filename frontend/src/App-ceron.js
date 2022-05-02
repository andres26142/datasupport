import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import LoginPage from "./Pages/LoginPage";


function App (){
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(function(){
    let isLoggedIn = localStorage.getItem('access') ? true : false;
    setLoggedIn(isLoggedIn)
    if (loggedIn) {
      fetch('https://datasupport.site/api/personas/clientes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ user: json });
        });
    }
  }, [

  ])

 return (
  <div className="App">
    <LoginPage></LoginPage>
  </div>
 )
}

export default App