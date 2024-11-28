import React, { useState } from 'react';
import Post from '../../component/Post'; // ใช้คอมโพเนนต์โพสต์
import Navbar from '../../layouts/Navbar/Navbar'; // นำเข้าคอมโพเนนต์ Navbar
import './Bookmark.css';

const Bookmark = ({ posts, onRemoveBookmark }) => {
  return (
    <div>
      <Navbar tab="bookmark" setTab={() => {}} /> {/* เพิ่ม Navbar */}
      <div className="bookmark-container">
        
        <div className="post-grid">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDeletePost={() => onRemoveBookmark(post.id)} // ลบจาก bookmark
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
