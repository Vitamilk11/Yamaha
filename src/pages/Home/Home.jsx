// import React from "react";
// import Post from "../../component/Post"; // แก้เส้นทางตรงนี้
// import "./Home.css";

// function Home({ posts, onDeletePost }) {
//     return (
//         <div className="home-container">
//             <div className="post-grid">
//                 {posts.map((post) => (
//                     <Post
//                         key={post.id}
//                         post={post}
//                         onDeletePost={() => onDeletePost(post.id)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Home;


// import React from "react";
// import Post from "../../component/Post"; // แก้เส้นทางตรงนี้
// import "./Home.css";

// const Home = ({ posts, onDeletePost, onBookmarkPost }) => {
//   return (
//     <div className="home-container">
//       <div className="post-grid">
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             post={post}
//             onDeletePost={() => onDeletePost(post.id)} // ฟังก์ชันลบโพสต์
//             onBookmarkPost={() => onBookmarkPost(post)} // ฟังก์ชัน Bookmark
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React from "react";
// import Post from "../../component/Post"; // แก้เส้นทางตรงนี้
// import "./Home.css";

// function Home({ posts, onDeletePost, onBookmarkPost, onLikePost }) {
//     return (
//       <div className="home-container">
//         <div className="post-grid">
//           {posts.map((post) => (
//             <Post
//               key={post.id}
//               post={post}
//               onDeletePost={() => onDeletePost(post.id)}
//               onBookmarkPost={() => onBookmarkPost(post)}
//               onLikePost={() => onLikePost(post.id)}  // ส่งฟังก์ชันการไลค์
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
  
//   export default Home;


// Home.jsx



import React, { useState } from "react";
import Post from "../../component/Post";
import "./Home.css";

function Home({
  posts,
  onDeletePost,
  onBookmarkPost,
  onLikePost,
  onAddComment,
  onDeleteComment,
  onCreatePost, // รับฟังก์ชันสร้างโพสต์จาก App.js
}) {
  const [postContent, setPostContent] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmitPost = () => {
    if (!postContent.trim() && imageFiles.length === 0) {
      alert("กรุณาเพิ่มข้อความหรือรูปภาพก่อนโพสต์");
      return;
    }
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    onCreatePost(postContent, imageUrls); // เรียกฟังก์ชันสร้างโพสต์
    setPostContent("");
    setImageFiles([]);
  };

  return (
    <div className="home-container">
      {/* ฟอร์มสร้างโพสต์ */}
      <div className="create-post-container">
<textarea
  placeholder="What's on your mind?"
  value={postContent}
  onChange={(e) => setPostContent(e.target.value)}
  className="create-post-textarea"
/>
<div className="post-actions-container">
  <div className="file-upload">
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
      className="file-input"
      id="file-input"
    />
    <label htmlFor="file-input" className="file-label">
      <span>Choose images</span>
    </label>
  </div>
  <button onClick={handleSubmitPost} className="post-button">
    Post
  </button>
</div>
</div>

      {/* แสดงโพสต์ */}
      <div className="post-grid">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDeletePost={onDeletePost}
            onBookmarkPost={onBookmarkPost}
            onLikePost={onLikePost}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;





// import React from "react";
// import Post from "../../component/Post"; // แก้เส้นทางตรงนี้
// import "./Home.css";

// function Home({ posts, onDeletePost }) {
//     return (
//         <div className="home-container">
//             <div className="post-grid">
//                 {posts.map((post) => (
//                     <Post
//                         key={post.id}
//                         post={post}
//                         onDeletePost={() => onDeletePost(post.id)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Home;










