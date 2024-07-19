import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>Sign Up</h2>
        <form style={formStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={this.state.txtUsername}
              onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={this.state.txtPassword}
              onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={this.state.txtName}
              onChange={(e) => { this.setState({ txtName: e.target.value }) }}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Phone</label>
            <input
              type="tel"
              value={this.state.txtPhone}
              onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={this.state.txtEmail}
              onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <button
              type="submit"
              onClick={(e) => this.btnSignupClick(e)}
              style={buttonStyle}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Please input username, password, name, phone, and email');
    }
  }

  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '20px',
  backgroundColor: '#f4f4f9',
  height: '100vh'
};

const headerStyle = {
  color: '#ff6f61',
  marginBottom: '20px'
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px'
};

const formGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '16px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#ff6f61',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  fontWeight: 'bold'
};

export default Signup;
