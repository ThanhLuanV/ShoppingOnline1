import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    if (this.context.token === '') {
      return (
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h2 style={headerStyle}>ADMIN LOGIN</h2>
            <form onSubmit={(e) => this.btnLoginClick(e)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={this.state.txtUsername}
                  onChange={(e) => this.setState({ txtUsername: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={this.state.txtPassword}
                  onChange={(e) => this.setState({ txtPassword: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={buttonStyle}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      );
    }
    return (<div />);
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

// Inline styles
const containerStyle = {
  height: '100vh',
  background: 'linear-gradient(135deg, #f5f7f9, #e0eafc)',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
};

const headerStyle = {
  color: '#4a4a4a',
  fontFamily: '"Roboto", sans-serif',
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '20px',
  textAlign: 'center',
};

const inputStyle = {
  border: '1px solid #ced4da',
  borderRadius: '8px',
  padding: '12px',
  fontSize: '1rem',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  border: 'none',
  padding: '10px',
  fontSize: '1.2rem',
  borderRadius: '8px',
  transition: 'background-color 0.3s ease',
  display: 'block',
  margin: '0 auto',
  outline: 'none',
};

export default Login;
