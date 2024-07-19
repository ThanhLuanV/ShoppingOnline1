import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} style={{ backgroundColor: '#ffd1dc' }} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index} style={{ fontWeight: 'bold', color: '#d32f2f' }}> | {index + 1} | </span>);
      } else {
        return (<span key={index} style={{ color: '#f48fb1', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.lnkPageClick(index + 1)}> | {index + 1} | </span>);
      }
    });

    return (
      <div style={{ backgroundColor: '#ffebee', padding: '20px', borderRadius: '8px' }}>
        <div style={{ float: 'left' }}>
          <h2 style={{ textAlign: 'center', color: '#d32f2f' }}>PRODUCT LIST</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="datatable" border="1">
            <thead>
              <tr style={{ backgroundColor: '#f8bbd0', color: '#880e4f' }}>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {prods}
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div style={{ clear: 'both' }} />
      </div>
    );
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}

export default Product;
