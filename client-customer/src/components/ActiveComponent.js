import axios from 'axios';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 card shadow-lg p-4" style={cardStyle}>
            <h2 className="text-center mb-4">Activate Account</h2>
            <form onSubmit={(e) => this.btnActiveClick(e)}>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={this.state.txtID}
                  onChange={(e) => this.setState({ txtID: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="token" className="form-label">Token</label>
                <input
                  type="text"
                  className="form-control"
                  id="token"
                  value={this.state.txtToken}
                  onChange={(e) => this.setState({ txtToken: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={buttonStyle}>Activate</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Account activated successfully!');
      } else {
        alert('Activation failed. Please try again.');
      }
    });
  }
}

// Inline styles
const cardStyle = {
  backgroundColor: '#fce4ec', // Light pink background for the card
  borderColor: '#f8bbd0', // Light pink border color
  borderRadius: '10px', // Rounded corners for the card
};

const inputStyle = {
  borderColor: '#f8bbd0', // Light pink border color for input fields
  borderRadius: '5px', // Rounded corners for input fields
};

const buttonStyle = {
  backgroundColor: '#ec407a', // Pink background color for button
  borderColor: '#ec407a', // Pink border color for button
  color: '#fff', // White text color
  borderRadius: '5px', // Rounded corners for button
  fontWeight: 'bold', // Bold text
  fontSize: '16px', // Font size
  transition: 'background-color 0.3s, border-color 0.3s', // Smooth transition
};

export default Active;
