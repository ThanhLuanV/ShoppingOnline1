import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} style={rowStyle}>
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" style={imageStyle} /></td>
          <td>${item.product.price.toFixed(2)}</td>
          <td>{item.quantity}</td>
          <td>${(item.product.price * item.quantity).toFixed(2)}</td>
          <td><span style={linkStyle} onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>
        </tr>
      );
    });

    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>ITEM LIST</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mycart}
            <tr>
              <td colSpan="7" style={totalCellStyle}></td>
              <td>Total</td>
              <td>${CartUtil.getTotal(this.context.mycart).toFixed(2)}</td>
              <td><span style={linkStyle} onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]); // Ensure to update state immutably
    }
  }

  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Checkout successful!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Checkout failed!');
      }
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

const headerStyle = {
  color: '#ff6f61', // Light pink header
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

const linkStyle = {
  color: '#ff6f61',
  cursor: 'pointer',
  textDecoration: 'underline'
};

const totalCellStyle = {
  textAlign: 'right',
  fontWeight: 'bold'
};

export default withRouter(Mycart);
