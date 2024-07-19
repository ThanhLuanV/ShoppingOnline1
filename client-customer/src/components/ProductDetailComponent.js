import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div style={containerStyle}>
          <h2 style={headerStyle}>Product Details</h2>
          <div style={productDetailStyle}>
            <img src={"data:image/jpg;base64," + prod.image} alt={prod.name} style={imageStyle} />
            <div style={detailsStyle}>
              <h3>{prod.name}</h3>
              <p><strong>ID:</strong> {prod._id}</p>
              <p><strong>Price:</strong> ${prod.price}</p>
              <p><strong>Category:</strong> {prod.category.name}</p>
              <div style={quantityContainerStyle}>
                <label style={labelStyle}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={this.state.txtQuantity}
                  onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                  style={quantityInputStyle}
                />
              </div>
              <button
                onClick={(e) => this.btnAdd2CartClick(e)}
                style={buttonStyle}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Product added to cart!');
    } else {
      alert('Please input a valid quantity');
    }
  }
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
  textAlign: 'center'
};

const headerStyle = {
  color: '#ff6f61',
  marginBottom: '20px'
};

const productDetailStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px'
};

const imageStyle = {
  width: '400px',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const detailsStyle = {
  textAlign: 'left',
  maxWidth: '600px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const quantityContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '10px 0'
};

const labelStyle = {
  fontWeight: 'bold'
};

const quantityInputStyle = {
  width: '80px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #ddd'
};

const buttonStyle = {
  backgroundColor: '#ff6f61',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s, transform 0.2s',
  marginTop: '10px'
};

export default withRouter(ProductDetail);
