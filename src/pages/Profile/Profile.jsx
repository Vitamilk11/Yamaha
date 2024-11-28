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
              style={{ width: '210px', height: 'auto', marginRight: '10px' }}
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





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Profile.css";

// const tabs = [
//   { name: "home", label: "Home🏠" },
//   { name: "explorer", label: "Explorer🌐" },
//   { name: "search", label: "Search🔎" },
//   { name: "message", label: "Message💬" },
//   { name: "notification", label: "Notification🔔" },
//   { name: "bookmark", label: "Bookmark📑" },
//   { name: "profile", label: "Profile👤" },
//   { name: "logout", label: "Logout" },
// ];

// const Profile = ({ posts, setPosts }) => {
//   const [tab, setTab] = useState("profile");
//   const [profilePic, setProfilePic] = useState("");
//   const [name, setName] = useState("m_a_m_i_o_");
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [newPost, setNewPost] = useState({ src: "", caption: "" });
//   const [viewingImage, setViewingImage] = useState(null);
//   const [likedPosts, setLikedPosts] = useState(new Set());
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     const savedProfilePic = localStorage.getItem("profilePic");
//     const savedName = localStorage.getItem("profileName");
//     if (savedProfilePic) setProfilePic(savedProfilePic);
//     if (savedName) setName(savedName);
//   }, []);

//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//         localStorage.setItem("profilePic", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveProfile = () => {
//     localStorage.setItem("profileName", name);
//     setShowEditModal(false);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewPost({ ...newPost, src: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCreatePost = () => {
//     if (newPost.src && newPost.caption) {
//       const newId = Date.now();
//       const post = {
//         id: newId,
//         src: newPost.src,
//         caption: newPost.caption,
//         likes: 0,
//         comments: [],
//       };
//       setPosts([...posts, post]);
//       setNewPost({ src: "", caption: "" });
//       setShowPostModal(false);
//     }
//   };

//   const handleLike = (postId) => {
//     const updatedLikedPosts = new Set(likedPosts);
//     if (updatedLikedPosts.has(postId)) {
//       updatedLikedPosts.delete(postId);
//     } else {
//       updatedLikedPosts.add(postId);
//     }
//     setLikedPosts(updatedLikedPosts);
//   };

//   const handleCommentSubmit = (postId) => {
//     const updatedPosts = posts.map((post) =>
//       post.id === postId
//         ? {
//             ...post,
//             comments: [...post.comments, newComment],
//           }
//         : post
//     );
//     setPosts(updatedPosts);
//     setNewComment("");
//   };

//   const handleDeletePost = (postId) => {
//     const updatedPosts = posts.filter((post) => post.id !== postId);
//     setPosts(updatedPosts);
//     setViewingImage(null);
//   };

//   return (
//     <div className="profile-page">
      
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="Navbar-container">
//           {tabs.map(({ name, label }) => (
//             <Link key={name} to={`/${name}`}>
//               <button
//                 className={`btn ${tab === name ? "btn-secondary" : "btn-outline-secondary"}`}
//                 onClick={() => setTab(name)}
//               >
//                 {label}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="profile-header">
//           <label htmlFor="profile-pic-input" className="profile-pic-label">
//             <img className="profile-pic" src={profilePic} alt="profile" />
//           </label>
//           <input
//             type="file"
//             id="profile-pic-input"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleProfilePicChange}
//           />
//           <div className="profile-info">
//             <h1>{name}</h1>
//             <h4>19%🫀:)👻</h4>
//             <div className="profile-stats">
//               <Link to="/posts">
//                 <span>{posts.length} Posts</span>
//               </Link>
//               <Link to="/followers">
//                 <span>2500 Followers</span>
//               </Link>
//               <Link to="/following">
//                 <span>180 Following</span>
//               </Link>
//             </div>
//             <Link to="/Editprofile">
//             <button
//               className="edit-profile-btn"
//               onClick={() => setShowEditModal(true)}
//             >
//               แก้ไขโปรไฟล์
//             </button>
//             </Link>
//             <button
//               className="post-btn"
//               onClick={() => setShowPostModal(true)}
//             >
//               สร้างโพสต์
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="profile-divider"></div>

//         {/* Posts */}
//         <div className="profile-posts">
//           {posts.map((post) => (
//             <div
//               className="post"
//               key={post.id}
//               onClick={() => setViewingImage(post.id)}
//             >
//               <img src={post.src} alt={`post-${post.id}`} />
//             </div>
//           ))}
//         </div>

//         {/* Edit Profile Modal */}
//         {showEditModal && (
//           <div className="edit-profile-modal">
//             <div className="modal-content">
//               <h2>แก้ไขโปรไฟล์</h2>
//               <label htmlFor="edit-profile-pic-input">
//                 <img className="edit-profile-pic" src={profilePic} alt="Edit Profile" />
//               </label>
//               <input
//                 type="file"
//                 id="edit-profile-pic-input"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleProfilePicChange}
//               />
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="แก้ไขชื่อโปรไฟล์"
//               />
//               <button onClick={handleSaveProfile}>บันทึก</button>
//               <button onClick={() => setShowEditModal(false)}>ยกเลิก</button>
//             </div>
//           </div>
//         )}

//         {/* Post Modal */}
//         {showPostModal && (
//           <div className="post-modal">
//             <div className="modal-content">
//               <h2>สร้างโพสต์ใหม่</h2>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//               <textarea
//                 placeholder="คำบรรยาย..."
//                 value={newPost.caption}
//                 onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
//               ></textarea>
//               <button onClick={handleCreatePost}>โพสต์</button>
//               <button onClick={() => setShowPostModal(false)}>ยกเลิก</button>
//             </div>
//           </div>
//         )}

//         {/* Image Modal */}
//         {viewingImage && (
//           <div className="image-modal" onClick={() => setViewingImage(null)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-image">
//                 <img
//                   src={posts.find((post) => post.id === viewingImage)?.src}
//                   alt="viewing"
//                 />
//               </div>
//               <div className="modal-details">
//                 {/* Like Section */}
//                 <div className="post-actions">
//                   <button onClick={() => handleLike(viewingImage)} className="like-button">
//                     {likedPosts.has(viewingImage) ? "❤️ Liked" : "🤍 Like"}
//                   </button>
//                   <p>
//                     {posts.find((post) => post.id === viewingImage)?.likes +
//                       (likedPosts.has(viewingImage) ? 1 : 0)}{" "}
//                     likes
//                   </p>
//                 </div>

//                 {/* Comments Section */}
//                 <div className="comments-section">
//                   <h4>Comments:</h4>
//                   {posts
//                     .find((post) => post.id === viewingImage)
//                     ?.comments.map((comment, idx) => (
//                       <p key={idx}>{comment}</p>
//                     ))}
//                 </div>

//                 {/* Add Comment */}
//                 <div className="comment-input">
//                   <textarea
//                     placeholder="Add a comment..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                   ></textarea>
//                   <button onClick={() => handleCommentSubmit(viewingImage)}>
//                     Comment
//                   </button>
//                 </div>

//                 {/* Delete Post */}
//                 <button
//                   onClick={() => handleDeletePost(viewingImage)}
//                   className="delete-button"
//                 >
//                   Delete Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Profile.css";

// const tabs = [
//   { name: "home", label: "Home🏠" },
//   { name: "explorer", label: "Explorer🌐" },
//   { name: "search", label: "Search🔎" },
//   { name: "message", label: "Message💬" },
//   { name: "notification", label: "Notification🔔" },
//   { name: "bookmark", label: "Bookmark📑" },
//   { name: "profile", label: "Profile👤" },
//   { name: "logout", label: "Logout" },
// ];

// const Profile = () => {
//   const [tab, setTab] = useState("profile");
//   const [profilePic, setProfilePic] = useState("");

//   // ดึงข้อมูลจาก Local Storage เมื่อหน้าโหลด
//   useEffect(() => {
//     const savedProfilePic = localStorage.getItem("profilePic");
//     if (savedProfilePic) {
//       setProfilePic(savedProfilePic);
//     }
//   }, []);

//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       src: "https://image.springnews.co.th/uploads/images/md/2020/08/4BkKcJFsPhbLEjCrZ4i8.jpg?x-image-process=style/LG-webp",
//       likes: 120,
//       comments: ["Great shot!", "Love this!"],
//     },
//     {
//       id: 2,
//       src: "https://static7.depositphotos.com/1007911/756/i/450/depositphotos_7561351-stock-photo-man-riding-with-speedbike-in.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//     {
//       id: 3,
//       src: "https://hilight.kapook.com/img_cms2/user/juthamat/mod8/27012016M38.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//     {
//       id: 4,
//       src: "https://cdn.ananda.co.th/blog/thegenc/wp-content/uploads/2019/02/Cafe-Thieves-web_01.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//     {
//       id: 1,
//       src: "https://image.springnews.co.th/uploads/images/md/2020/08/4BkKcJFsPhbLEjCrZ4i8.jpg?x-image-process=style/LG-webp",
//       likes: 120,
//       comments: ["Great shot!", "Love this!"],
//     },
//     {
//       id: 2,
//       src: "https://static7.depositphotos.com/1007911/756/i/450/depositphotos_7561351-stock-photo-man-riding-with-speedbike-in.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//     {
//       id: 3,
//       src: "https://hilight.kapook.com/img_cms2/user/juthamat/mod8/27012016M38.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//     {
//       id: 4,
//       src: "https://cdn.ananda.co.th/blog/thegenc/wp-content/uploads/2019/02/Cafe-Thieves-web_01.jpg",
//       likes: 80,
//       comments: ["Amazing photo!", "Wow!"],
//     },
//   ]);

//   const [viewingImage, setViewingImage] = useState(null);
//   const [likedPosts, setLikedPosts] = useState(new Set());
//   const [newComment, setNewComment] = useState("");

//   const handleLike = (postId, event) => {
//     event.stopPropagation();
//     const updatedLikes = new Set(likedPosts);
//     if (updatedLikes.has(postId)) {
//       updatedLikes.delete(postId);
//     } else {
//       updatedLikes.add(postId);
//     }
//     setLikedPosts(updatedLikes);
//   };

//   const handleCommentSubmit = (postId, event) => {
//     event.stopPropagation();
//     if (newComment.trim()) {
//       const updatedPosts = posts.map((post) =>
//         post.id === postId
//           ? { ...post, comments: [...post.comments, newComment] }
//           : post
//       );
//       setPosts(updatedPosts);
//       setNewComment(""); // เคลียร์คอมเมนต์หลังโพสต์
//     }
//   };

//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//         localStorage.setItem("profilePic", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="profile-page">
//       <div className="sidebar">
//         <div className="Navbar-container">
//           {tabs.map(({ name, label }) => (
//             <Link key={name} to={`/${name}`}>
//               <button
//                 className={`btn ${tab === name ? "btn-secondary" : "btn-outline-secondary"}`}
//                 onClick={() => setTab(name)}
//               >
//                 {label}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="profile-header">
//           <label htmlFor="profile-pic-input" className="profile-pic-label">
//             <img className="profile-pic" src={profilePic} alt="profile" />
//           </label>
//           <input
//             type="file"
//             id="profile-pic-input"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleProfilePicChange}
//           />
//           <div className="profile-info">
//             <h1>m_a_m_i_o_</h1>
//             <div className="profile-stats">
//               <Link to="/posts">
//                 <span>{posts.length} Posts</span>
//               </Link>
//               <Link to="/followers">
//                 <span>2500 Followers</span>
//               </Link>
//               <Link to="/following">
//                 <span>180 Following</span>
//               </Link>
//             </div>
//             <button
//               className="edit-profile-btn"
//               onClick={() => document.getElementById("profile-pic-input").click()}
//             >
//               แก้ไขโปรไฟล์
//             </button>
//             <button
//             className="post-btn"
//             onClick={() => setShowPostModal(true)} // Opens modal to create a new post
//           >
//             สร้างโพสต์
//           </button>
//           </div>

//         </div>

//         <div className="profile-posts">
//           {posts.map((post) => (
//             <div className="post" key={post.id}>
//               <img
//                 src={post.src}
//                 alt={`post-${post.id}`}
//                 onClick={() => setViewingImage(post.id)}
//               />
//             </div>
//           ))}
//         </div>

//         {viewingImage && (
//           <div className="image-modal" onClick={() => setViewingImage(null)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-image">
//                 <img
//                   src={posts.find((post) => post.id === viewingImage)?.src}
//                   alt="viewing"
//                 />
//               </div>
//               <div className="modal-details">
//                 <div className="post-actions">
//                   <button
//                     onClick={(e) => handleLike(viewingImage, e)}
//                     className="like-button"
//                   >
//                     {likedPosts.has(viewingImage) ? "❤️ Liked" : "🤍 Like"}
//                   </button>
//                   <p>
//                     {posts.find((post) => post.id === viewingImage)?.likes +
//                       (likedPosts.has(viewingImage) ? 1 : 0)}{" "}
//                     likes
//                   </p>
//                 </div>
//                 <div className="comments-section">
//                   <h4>Comments:</h4>
//                   {posts
//                     .find((post) => post.id === viewingImage)
//                     ?.comments.map((comment, idx) => (
//                       <p key={idx}>{comment}</p>
//                     ))}
//                 </div>
//                 <div className="comment-input">
//                   <textarea
//                     placeholder="Add a comment..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                   />
//                   <button
//                     onClick={(e) => handleCommentSubmit(viewingImage, e)}
//                   >
//                     Post Comment
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <button className="close-modal" onClick={() => setViewingImage(null)}>
//               X
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;









// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Profile.css";
// // import "./Navbar.css"; // เพิ่มไฟล์ CSS ของ Navbar

// const tabs = [
//   { name: "home", label: "Home🏠" },
//   { name: "explorer", label: "Explorer🌐" },
//   { name: "search", label: "Search🔎" },
//   { name: "message", label: "Message💬" },
//   { name: "notification", label: "Notification🔔" },
//   { name: "bookmark", label: "Bookmark📑" },
//   { name: "profile", label: "Profile👤" },
// ];

// const Profile = () => {
//   const [tab, setTab] = useState("profile");

//   const user = {
//     username: "john_doe",
//     name: "John Doe",
//     bio: "Photographer | Traveler | Food Lover",
//     profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ia1K3_I6TaFTS2bl-T40jFj-oEf7Yh5tpQ&s",
//     followers: 2500,
//     following: 180,
//     posts: 89,
//     postImages: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75MQtq6oY9yn0GXEiSL6mKWUfZgUpqGx6lg&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw0l-3SpzBjZq8b1uaWFV6f7h_F7y5YS9fdQ&s",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//   };

//   return (
//     <div className="profile-page">
//       {/* Sidebar Navbar */}
//       <div className="sidebar">
//         <div className="Navbar-container">
//           {tabs.map(({ name, label }) => (
//             <Link key={name} to={`/${name}`}>
//               <button
//                 className={`btn ${
//                   tab === name ? "btn-secondary" : "btn-outline-secondary"
//                 }`}
//                 onClick={() => setTab(name)}
//               >
//                 {label}
//               </button>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="main-content">
//         <div className="profile-header">
//           <img className="profile-pic" src={user.profilePic} alt="profile" />
//           <div className="profile-info">
//             <h1>{user.name}</h1>
//             <p>@{user.username}</p>
//             <p>{user.bio}</p>
//             <div className="profile-stats">
//               <span>{user.posts} Posts</span>
//               <span>{user.followers} Followers</span>
//               <span>{user.following} Following</span>
//             </div>
//           </div>
//         </div>

//         <div className="profile-posts">
//           {user.postImages.map((image, index) => (
//             <div className="post" key={index}>
//               <img src={image} alt={`post-${index}`} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




// import './Profile.css'
// function Profile() {
//     return (
//         <div className='profile-container'>
//                 <h1>
//                 Profile
//                 </h1>
//         </div>
//     );
// }
// export default Profile
