import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    const orders = this.state.orders.map((item) => (
      <tr key={item._id} style={rowStyle} onClick={() => this.trItemClick(item)}>
        <td>{item._id}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.customer.name}</td>
        <td>{item.customer.phone}</td>
        <td>${item.total.toFixed(2)}</td>
        <td>{item.status}</td>
      </tr>
    ));

    const items = this.state.order ? this.state.order.items.map((item, index) => (
      <tr key={item.product._id} style={rowStyle}>
        <td>{index + 1}</td>
        <td>{item.product._id}</td>
        <td>{item.product.name}</td>
        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" style={imageStyle} /></td>
        <td>${item.product.price.toFixed(2)}</td>
        <td>{item.quantity}</td>
        <td>${(item.product.price * item.quantity).toFixed(2)}</td>
      </tr>
    )) : null;

    return (
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h2 style={headerStyle}>ORDER LIST</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={headerRowStyle}>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust.name</th>
                <th>Cust.phone</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order && (
          <div style={sectionStyle}>
            <h2 style={headerStyle}>ORDER DETAIL</h2>
            <table style={tableStyle}>
              <thead>
                <tr style={headerRowStyle}>
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '20px'
};

const sectionStyle = {
  marginBottom: '30px'
};

const headerStyle = {
  color: '#ff6f61', // Light pink for header
  textAlign: 'center',
  marginBottom: '20px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff'
};

const headerRowStyle = {
  backgroundColor: '#ffeef8', // Light pink background for header row
  color: '#ff6f61',
  fontWeight: 'bold'
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
  textAlign: 'center',
  height: '50px'
};

const imageStyle = {
  borderRadius: '5px'
};

export default Myorders;
