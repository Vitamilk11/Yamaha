import React from 'react';
import Post from '../../component/Post'; // ใช้คอมโพเนนต์โพสต์
import Navbar from '../../layouts/Navbar/Navbar'; // นำเข้าคอมโพเนนต์ Navbar
import './Explorer.css';

const Explorer = ({ posts, onRemoveBookmark }) => {
  return (
    <div>
      <Navbar tab="explorer" setTab={() => {}} /> {/* เพิ่ม Navbar */}
      <div className="explorer-container">
       
        <div className="post-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDeletePost={() => onRemoveBookmark(post.id)} // ลบโพสต์ออกจาก Explorer
              />
            ))
          ) : (
            <p>No liked posts yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;