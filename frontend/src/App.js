import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ListUsers from './components/ListUsers-old';
import ListUsers2 from './components/ListUsers';
import './App.css';


let username=null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('access') ? true : false,
      username: '',
      error: ''
    };
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({
      logged_in: false
    })
  }


  handle_login = (e, data) => {
    e.preventDefault();
    fetch('https://datasupport.site/api/auth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if(res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        else if(res.status >= 401){
          throw new Error("Invalid Credentials!");
          this.state({
            error:"Ha ocurrido un error"
          });
        }
        return res.json();
      })
      .then(json => {
        localStorage.setItem('access', json.access);
        localStorage.setItem('refresh', json.refresh);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: data.username
        });
      }).catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('https://datasupport.site/api/personas/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('access', json.acess);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    let listUsers;

    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (

      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {this.state.error}
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
            
        </h3>
          
        
        {this.state.logged_in ? <ListUsers2 handler = {this.handler}></ListUsers2> : null} 
        
      </div>
    );
  }
}

export default App;