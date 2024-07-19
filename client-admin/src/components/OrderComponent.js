import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} style={{ backgroundColor: '#fff0f0' }} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div>
                <span style={{ color: '#e57373', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span>
                {' || '}
                <span style={{ color: '#e57373', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span>
              </div>
              : <div />}
          </td>
        </tr>
      );
    });

    let items;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} style={{ backgroundColor: '#fff0f0' }} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }

    return (
      <div style={{ backgroundColor: '#ffe4e1', padding: '20px', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#d32f2f' }}>ORDER LIST</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="datatable" border="1">
            <thead>
              <tr style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust.name</th>
                <th>Cust.phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#d32f2f' }}>ORDER DETAIL</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className="datatable" border="1">
              <thead>
                <tr style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
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
          : <div />}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Order;
