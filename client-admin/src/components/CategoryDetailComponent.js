import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div style={{ backgroundColor: '#ffebee', padding: '20px', borderRadius: '8px', width: '300px', float: 'right' }}>
        <h2 style={{ textAlign: 'center', color: '#d32f2f' }}>CATEGORY DETAIL</h2>
        <form>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px', textAlign: 'right' }}>ID:</td>
                <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} style={{ width: '100%' }} /></td>
              </tr>
              <tr>
                <td style={{ padding: '8px', textAlign: 'right' }}>Name:</td>
                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} style={{ width: '100%' }} /></td>
              </tr>
              <tr>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" onClick={(e) => this.btnAddClick(e)} style={buttonStyle('add')}>Add New</button>
                  <button type="button" onClick={(e) => this.btnUpdateClick(e)} style={buttonStyle('update')}>Update</button>
                  <button type="button" onClick={(e) => this.btnDeleteClick(e)} style={buttonStyle('delete')}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }

  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category added successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to add category.');
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category updated successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to update category.');
      }
    });
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this category?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category deleted successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to delete category.');
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}

const buttonStyle = (type) => {
  const baseStyle = {
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const color = {
    add: '#4caf50',   // Green
    update: '#ffa000', // Orange
    delete: '#f44336'  // Red
  };

  return { ...baseStyle, backgroundColor: color[type] };
};

export default CategoryDetail;
