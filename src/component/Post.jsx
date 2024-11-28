import React, { useState } from "react";
import "./Post.css";

const Post = ({
  post,
  onDeletePost,
  onLikePost,
  onBookmarkPost,
  onAddComment,
  onDeleteComment
}) => {
  const [newComment, setNewComment] = useState("");

  // Handle comment submission
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(post.id, newComment); // Send comment to the parent component
      setNewComment(""); // Clear the input field
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    onDeleteComment(post.id, commentId); // Delete comment using commentId
  };

  const comments = Array.isArray(post.comments) ? post.comments : [];

  // Set default profile picture if not provided
  const defaultProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjyXZTe-o3m4i1EJydBsQCskCbbYXb_6RPA&s"; // Replace with your default profile image path
  const profilePic = post.userProfilePic || defaultProfilePic;

  return (
    <div className="post-container">
      <div className="post-header">
      <img src={profilePic} alt="profile" className="profile-pic" />
      <h5>{post.user}</h5> {/* เพิ่มชื่อของผู้โพสต์ */}
      </div>

      <div className="post-image">
        {post.images &&
          post.images.map((image, index) => (
            <img key={index} src={image} alt="post" />
          ))}
      </div>

      {/* Action buttons */}
      <div className="post-icons">
        <button onClick={() => onLikePost(post.id)} className="icon-btn">
          ❤️ {post.likes}
        </button>
        <button onClick={() => onBookmarkPost(post)} className="icon-btn">
          🔖
        </button>
        <button onClick={() => onDeletePost(post.id)} className="icon-btn">
          🗑️
        </button>
      </div>

      {/* Post content */}
      <div className="post-caption">
        <strong>{post.user}</strong> {post.content}
        <small>{post.time}</small>
      </div>

      {/* Display comments */}
      <div className="post-comments">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <span>{comment.text}</span> {/* Display comment text */}
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="delete-comment-button"
              >
                
              </button>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>

      {/* Add new comment */}
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
};

export default Post;




// import React, { useState } from "react";

// const Post = ({ post, onDeletePost, onLikePost, onBookmarkPost, onAddComment, onDeleteComment }) => {
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (newComment.trim() !== "") {
//       onAddComment(post.id, newComment);
//       setNewComment(""); // รีเซ็ตช่องพิมพ์คอมเมนต์
//     }
//   };

//   const handleDeleteComment = (commentIndex) => {
//     onDeleteComment(post.id, commentIndex); // ลบคอมเมนต์ตาม index
//   };

//   const comments = Array.isArray(post.comments) ? post.comments : [];

//   return (
//     <div className="post">
//       <div className="post-header">
//         <h5>{post.user}</h5>
//       </div>

//       <div className="post-content">
//         <p>{post.content}</p>
//         <small>{post.time}</small>
//         {post.images &&
//           post.images.map((image, index) => (
//             <img key={index} src={image} alt="post" className="post-image" />
//           ))}
//       </div>

//       <div className="button-actions">
//         <button onClick={() => onLikePost(post.id)} className="like-button">
//           ❤️ Like {post.likes}
//         </button>
//         <button onClick={() => onBookmarkPost(post)} className="bookmark-button">
//           🔖 Bookmark
//         </button>
//       </div>

//       <div className="post-actions">
//         <button onClick={() => onDeletePost(post.id)} className="delete-button">
//           🗑️ Delete
//         </button>
//       </div>

//       <div className="post-comments">
//         <div>
//           {comments.length > 0 ? (
//             comments.map((comment, index) => (
//               <div key={index} className="comment">
//                 <span>{comment}</span>
//                 <button
//                   onClick={() => handleDeleteComment(index)} // ลบคอมเมนต์ตาม index
//                   className="delete-comment-button"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No comments yet</p>
//           )}
//         </div>

//         <div className="add-comment">
//           <input
//             type="text"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment"
//           />
//           <button onClick={handleAddComment}>Post Comment</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;