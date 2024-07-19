import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <h2 style={headerStyle}>ADMIN HOME</h2>
        <img
          src="https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-powerpoint-xin-chao-khung-long-mau-sac.jpg"
          width="1200px"
          height="800px"
          alt="Welcome Image"
          style={imageStyle}
        />
      </div>
    );
  }
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f4f8', // Một màu nền nhẹ nhàng
  padding: '20px',
};

const headerStyle = {
  fontSize: '3rem',
  fontFamily: '"Roboto", sans-serif',
  color: '#2c3e50', // Một màu xám đậm để làm nổi bật tiêu đề
  marginBottom: '20px',
  textAlign: 'center',
  fontWeight: '700', // Tạo cảm giác chắc chắn và hiện đại
};

const imageStyle = {
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  maxWidth: '90%',
  height: 'auto',
};

export default Home;

