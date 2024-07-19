import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id} selected={cate._id === this.props.item?.category?._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>PRODUCT DETAIL</h2>
        <form>
          <div style={formGroupStyle}>
            <label style={labelStyle}>ID:</label>
            <input
              type="text"
              value={this.state.txtID}
              onChange={(e) => { this.setState({ txtID: e.target.value }) }}
              readOnly
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={this.state.txtName}
              onChange={(e) => { this.setState({ txtName: e.target.value }) }}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Price:</label>
            <input
              type="number"
              value={this.state.txtPrice}
              onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Category:</label>
            <select
              onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}
              style={selectStyle}
            >
              <option value='select'>--select--</option>
              {cates}
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Image:</label>
            <input
              type="file"
              name="fileImage"
              accept="image/jpeg, image/png, image/gif"
              onChange={(e) => this.previewImage(e)}
              style={inputStyle}
            />
          </div>

          <div style={buttonContainerStyle}>
            <button type="submit" onClick={(e) => this.btnAddClick(e)} style={buttonAddStyle}>ADD NEW</button>
            <button type="submit" onClick={(e) => this.btnUpdateClick(e)} style={buttonUpdateStyle}>UPDATE</button>
            <button type="submit" onClick={(e) => this.btnDeleteClick(e)} style={buttonDeleteStyle}>DELETE</button>
          </div>

          <div style={imageContainerStyle}>
            <img src={this.state.imgProduct} width="300px" height="300px" alt="" style={imageStyle} />
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }

  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseFloat(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && !isNaN(price) && category && category !== 'select' && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name, price, category, and image');
    }
  }

  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Product added successfully!');
        this.apiGetProducts();
      } else {
        alert('Failed to add product!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length === 0) {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseFloat(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && !isNaN(price) && category && category !== 'select' && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Please input id, name, price, category, and image');
    }
  }

  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Product updated successfully!');
        this.apiGetProducts();
      } else {
        alert('Failed to update product!');
      }
    });
  }

  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }

  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Product deleted successfully!');
        this.apiGetProducts();
      } else {
        alert('Failed to delete product!');
      }
    });
  }
}

const containerStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9', // Light background color for the container
};

const titleStyle = {
  textAlign: 'center',
  color: '#333', // Darker text color for better contrast
  marginBottom: '20px',
};

const formGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
};

const labelStyle = {
  width: '150px',
  textAlign: 'right',
  padding: '10px',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const selectStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const buttonAddStyle = {
  ...buttonStyle,
  backgroundColor: '#4caf50', // Green for Add
};

const buttonUpdateStyle = {
  ...buttonStyle,
  backgroundColor: '#ff9800', // Orange for Update
};

const buttonDeleteStyle = {
  ...buttonStyle,
  backgroundColor: '#f44336', // Red for Delete
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};

export default ProductDetail;



