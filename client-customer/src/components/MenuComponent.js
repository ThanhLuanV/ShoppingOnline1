import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu-item">
        <Link to={'/product/category/' + item._id} className="menu-link">{item.name}</Link>
      </li>
    ));

    return (
      <div className="menu-container">
        <div className="menu-left">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">Home</Link>
            </li>
            {cates}
          </ul>
        </div>
        <div className="menu-right">
          <form className="search-form" onSubmit={(e) => this.btnSearchClick(e)}>
            <input
              type="search"
              placeholder="Enter keyword"
              className="search-input"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    );
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);

// Inline CSS
const style = `
.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffeef8; /* Light pink background */
  border-bottom: 2px solid #ffb6c1; /* Light pink border */
}

.menu-left {
  flex: 1;
}

.menu-right {
  flex: 1;
  text-align: right;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu-item {
  margin-right: 20px;
}

.menu-link {
  text-decoration: none;
  color: #ff69b4; /* Hot pink color for links */
  font-weight: bold;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #ff1493; /* Deep pink for hover effect */
}

.search-form {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 5px;
  border: 1px solid #ff69b4; /* Hot pink border */
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  background-color: #ff69b4; /* Hot pink background */
  color: #fff; /* White text */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.search-button:hover {
  background-color: #ff1493; /* Darker pink on hover */
}
`;

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = style;
document.head.appendChild(styleSheet);
