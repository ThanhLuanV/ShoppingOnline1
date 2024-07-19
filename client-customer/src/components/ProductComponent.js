import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const { products } = this.state;
    const prods = products.map((item) => (
      <div key={item._id} style={productCardStyle}>
        <Link to={'/product/' + item._id}>
          <img
            src={"data:image/jpg;base64," + item.image}
            alt={item.name}
            style={imageStyle}
          />
        </Link>
        <div style={captionStyle}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
        </div>
      </div>
    ));

    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>List of Products</h2>
        <div style={productListStyle}>
          {prods}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9'
};

const headerStyle = {
  textAlign: 'center',
  color: '#ff6f61',
  marginBottom: '20px'
};

const productListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px'
};

const productCardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  overflow: 'hidden',
  width: '300px',
  padding: '10px'
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover'
};

const captionStyle = {
  padding: '10px',
  color: '#333'
};

export default withRouter(Product);
