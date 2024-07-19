import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} style={{ backgroundColor: '#ffe4e1' }} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    return (
      <div style={{ backgroundColor: '#ffebee', padding: '20px', borderRadius: '8px' }}>
        <div style={{ float: 'left' }}>
          <h2 style={{ textAlign: 'center', color: '#d32f2f' }}>CATEGORY LIST</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="datatable" border="1">
            <thead>
              <tr style={{ backgroundColor: '#f8bbd0', color: '#880e4f' }}>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {cates}
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div style={{ clear: 'both' }} />
      </div>
    );
  }

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;
