import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const tabs = [
  { name: "home", label: "Home🏠" },
  { name: "explorer", label: "Explorer🌐" },
  { name: "search", label: "Search🔎" },
  { name: "message", label: "Message💬" },
  // { name: "notification", label: "Notification🔔" },
  { name: "bookmark", label: "Bookmark📑" },
  { name: "profile", label: "Profile👤" },
  // { name: "logout", label: "Logout" },
  { name: "aboutdev", label: "About Developer👨‍💻" },
  
  

];

const Profile = ({ posts, setPosts }) => {
  const [tab, setTab] = useState("profile");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("m_a_m_i_o_");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ src: "", caption: "" });
  const [viewingImage, setViewingImage] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    const savedName = localStorage.getItem("profileName");
    if (savedProfilePic) setProfilePic(savedProfilePic);
    if (savedName) setName(savedName);
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("profileName", name);
    setShowEditModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, src: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (newPost.src && newPost.caption) {
      const newId = Date.now();
      const post = {
        id: newId,
        src: newPost.src,
        caption: newPost.caption,
        likes: 0,
        comments: [],
      };
      setPosts([...posts, post]);
      setNewPost({ src: "", caption: "" });
      setShowPostModal(false);
    }
  };

  const handleLike = (postId) => {
    const updatedLikedPosts = new Set(likedPosts);
    if (updatedLikedPosts.has(postId)) {
      updatedLikedPosts.delete(postId);
    } else {
      updatedLikedPosts.add(postId);
    }
    setLikedPosts(updatedLikedPosts);
  };

  const handleCommentSubmit = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [...post.comments, newComment],
          }
        : post
    );
    setPosts(updatedPosts);
    setNewComment("");
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setViewingImage(null);
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="Navbar-container">
          {/* Adding Logo here */}
          <h2>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_SimuGl_rhQI7rBCMhQBsZ0eKI98kWZExA&s"
              alt="Logo"
              style={{ width: '210px', height: 'auto', marginRight: '10px', borderRadius: '10px' }}
            />
          </h2>

          {tabs.map(({ name, label }) => (
            <Link key={name} to={`/${name}`}>
              <button
                className={`btn ${tab === name ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setTab(name)}
              >
                {label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="profile-header">
          <label htmlFor="profile-pic-input" className="profile-pic-label">
            <img className="profile-pic" src={profilePic} alt="profile" />
          </label>
          <input
            type="file"
            id="profile-pic-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
          />
          <div className="profile-info">
            <h1>{name}</h1>
            <h4>19%🫀:)👻</h4>
            <div className="profile-stats">
              <Link to="/posts">
                <span>{posts.length} Posts</span>
              </Link>
              <Link to="/followers">
                <span>2500 Followers</span>
              </Link>
              <Link to="/following">
                <span>180 Following</span>
              </Link>
            </div>
            <Link to="/Editprofile">
              <button
                className="edit-profile-btn"
                onClick={() => setShowEditModal(true)}
              >
                แก้ไขโปรไฟล์
              </button>
            </Link>
            <button
              className="post-btn"
              onClick={() => setShowPostModal(true)}
            >
              สร้างโพสต์
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="profile-divider-line"></div>

        {/* Posts Grid: Display images in 3-per-row layout */}
        <div className="profile-posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              {post.images && post.images.length > 0 ? (
                post.images.map((image, index) => (
                  <img key={index} src={image} alt={`post-${post.id}`} />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          ))}
        </div>

        {/* Modal and other profile components */}
        {showEditModal && (
          <div className="edit-profile-modal">
            <div className="modal-content">
              <h2>แก้ไขโปรไฟล์</h2>
              <label htmlFor="edit-profile-pic-input">
                <img className="edit-profile-pic" src={profilePic} alt="Edit Profile" />
              </label>
              <input
                type="file"
                id="edit-profile-pic-input"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="แก้ไขชื่อโปรไฟล์"
              />
              <button onClick={handleSaveProfile}>บันทึก</button>
              <button onClick={() => setShowEditModal(false)}>ยกเลิก</button>
            </div>
          </div>
        )}

        {showPostModal && (
          <div className="post-modal">
            <div className="modal-content">
              <h2>สร้างโพสต์ใหม่</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <textarea
                placeholder="คำบรรยาย..."
                value={newPost.caption}
                onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
              />
              <button onClick={handleCreatePost}>โพสต์</button>
              <button onClick={() => setShowPostModal(false)}>ยกเลิก</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;



