import React from "react";
import { useNavigate } from "react-router-dom";
import "./Followers.css";

// Mock Data for followers
const followersData = [
  {
    id: 1,
    name: "สยุมภู ไข่ถาวร",
    username: "alice_j",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKLqCP9mFDbp7c2W0d0SW7AgkhehxizNurg&s",
  },
  {
    id: 2,
    name: "บรรจง หนึ่งในยุทธจักร",
    username: "bob_smith",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofjHz5sQF0k8Mv-FByjP_FHmaZ5ha2IK8YQ&s",
  },
  {
    id: 3,
    name: "มนศักดิ์ กางมุ้งคอย",
    username: "charlie_brown",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLv1z1GIGZKnmQgbpLiZKuVlhf27f8zF6pA&s",
  },
  {
    id: 4,
    name: "อธิป จู๋กระจ่าง",
    username: "diana_green",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8CrnOjMTZ2LHOFhcNnTfIst8WwO0QSdeUw&s",
  },
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKLqCP9mFDbp7c2W0d0SW7AgkhehxizNurg&s",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob_smith",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofjHz5sQF0k8Mv-FByjP_FHmaZ5ha2IK8YQ&s",
  },
  {
    id: 3,
    name: "Charlie Brown",
    username: "charlie_brown",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLv1z1GIGZKnmQgbpLiZKuVlhf27f8zF6pA&s",
  },
  {
    id: 4,
    name: "Diana Green",
    username: "diana_green",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8CrnOjMTZ2LHOFhcNnTfIst8WwO0QSdeUw&s",
  },
  // Add more as needed
];

const Followers = () => {
  const navigate = useNavigate(); // สร้าง useNavigate hook

  const handleClose = () => {
    navigate("/profile"); // เมื่อกดปุ่ม X จะนำทางไปที่หน้าโปรไฟล์
  };

  return (
    <div className="followers-page">
      <div className="followers-header">
        <h3>Followers List</h3>
        <button className="close-btn" onClick={handleClose}>X</button>
      </div>
      <div className="followers-list">
        {followersData.map((follower) => (
          <div key={follower.id} className="follower-item">
            <img
              src={follower.profilePic}
              alt={follower.name}
              className="follower-pic"
            />
            <div className="follower-info">
              <h3>{follower.name}</h3>
              <p>@{follower.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;




