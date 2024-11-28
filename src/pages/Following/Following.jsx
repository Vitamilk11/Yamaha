import React from 'react';
import { useNavigate } from 'react-router-dom';  // นำเข้า useNavigate
import './Following.css';

// Sample data for following users (You can replace it with dynamic data later)
const followingList = [
  { id: 1, name: 'สายใจ เกาะมหาสนุก', username: 'john_doe', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'สมศักดิ์ หวังกระแทกคาง', username: 'jane_smith', profilePic: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 3, name: 'หวังนที จู๋ยืนยง', username: 'michael_johnson', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 4, name: 'กนกกร เม่งเวหา', username: 'emily_davis', profilePic: 'https://randomuser.me/api/portraits/women/2.jpg' },
  // Add more sample data as needed
];

const Following = () => {
  const navigate = useNavigate(); // สร้าง useNavigate hook

  const handleClose = () => {
    navigate('/profile');  // เมื่อกดปุ่มกากบาทจะนำทางไปที่หน้าโปรไฟล์
  };

  return (
    <div className="following-page">
      <div className="following-header">
        <h1>Following List</h1>
        <button className="close-btn" onClick={handleClose}>X</button>  {/* ปุ่มกากบาท */}
      </div>
      <div className="following-list">
        {followingList.map((user) => (
          <div key={user.id} className="following-item">
            <img className="profile-pic-following" src={user.profilePic} alt={user.name} />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;

