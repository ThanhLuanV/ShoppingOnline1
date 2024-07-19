import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
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
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <h2 style={headerStyle}>MY PROFILE</h2>
          <form onSubmit={(e) => this.btnUpdateClick(e)}>
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
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Phone</label>
              <input
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) => this.setState({ txtPhone: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={this.state.txtEmail}
                onChange={(e) => this.setState({ txtEmail: e.target.value })}
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" style={buttonStyle}>UPDATE</button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input all fields');
    }
  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Profile updated successfully!');
        this.context.setCustomer(result);
      } else {
        alert('Failed to update profile');
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
  backgroundColor: '#f9f9f9'
};

const formContainerStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const headerStyle = {
  color: '#ff6f61', // Light pink for header
  marginBottom: '20px'
};

const inputGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#ff6f61'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
};

const buttonStyle = {
  backgroundColor: '#ff6f61', // Button background color
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
  marginTop: '10px'
};

export default Myprofile;
