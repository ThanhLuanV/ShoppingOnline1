import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';

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
    return (
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <h2 style={headerStyle}>CUSTOMER LOGIN</h2>
          <form onSubmit={(e) => this.btnLoginClick(e)}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" style={buttonStyle}>LOGIN</button>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#ffeef8' // Light pink background
};

const formContainerStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '30px', // Increased padding for more height
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const headerStyle = {
  color: '#ff6f61', // Light pink for header
  marginBottom: '20px'
};

const inputGroupStyle = {
  marginBottom: '20px', // Increased margin for more spacing
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px', // Increased margin for more spacing
  color: '#ff6f61'
};

const inputStyle = {
  width: '100%',
  padding: '12px', // Increased padding for more height
  borderRadius: '5px',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
};

const buttonStyle = {
  backgroundColor: '#ff6f61', // Button background color
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '12px 20px', // Increased padding for more height
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
  marginTop: '10px'
};

export default withRouter(Login);


