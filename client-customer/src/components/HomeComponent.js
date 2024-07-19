import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => (
      <div key={item._id} style={productCardStyle}>
        <Link to={'/product/' + item._id}>
          <img src={"data:image/jpg;base64," + item.image} alt={item.name} style={productImageStyle} />
        </Link>
        <figcaption style={productCaptionStyle}>
          <div>{item.name}</div>
          <div>Price: {item.price}</div>
        </figcaption>
      </div>
    ));

    const hotprods = this.state.hotprods.map((item) => (
      <div key={item._id} style={productCardStyle}>
        <Link to={'/product/' + item._id}>
          <img src={"data:image/jpg;base64," + item.image} alt={item.name} style={productImageStyle} />
        </Link>
        <figcaption style={productCaptionStyle}>
          <div>{item.name}</div>
          <div>Price: {item.price}</div>
        </figcaption>
      </div>
    ));

    return (
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h2 style={titleStyle}>NEW PRODUCTS</h2>
          <div style={productGridStyle}>
            {newprods}
          </div>
        </div>
        {this.state.hotprods.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={titleStyle}>HOT PRODUCTS</h2>
            <div style={productGridStyle}>
              {hotprods}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

// Inline styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#fce4ec', // Màu hồng nhạt cho nền
};

const sectionStyle = {
  marginBottom: '30px',
};

const titleStyle = {
  textAlign: 'center',
  color: '#d81b60', // Màu hồng đậm cho tiêu đề
  marginBottom: '20px',
};

const productGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
};

const productCardStyle = {
  border: '1px solid #f8bbd0', // Màu hồng nhạt cho viền
  borderRadius: '8px',
  overflow: 'hidden',
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const productImageStyle = {
  width: '100%',
  height: 'auto',
  display: 'block',
  transition: 'transform 0.3s ease',
};

const productCaptionStyle = {
  padding: '15px',
  textAlign: 'center',
};

export default Home;

