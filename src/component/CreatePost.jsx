import React, { useState } from "react";
import "./CreatePost.css"; // Assuming you have a CSS file for styling

function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = () => {
    if (!content.trim() && selectedFiles.length === 0) {
      alert("กรุณาเพิ่มข้อความหรือรูปภาพก่อนโพสต์");
      return;
    }
    onCreatePost(content, selectedFiles); // Pass post content and files to the parent component
    setContent(""); // Clear text input
    setSelectedFiles([]); // Clear file selection
  };

  return (
    <div className="create-post-container">
      {/* Input field for post content */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="create-post-textarea"
      />

      {/* File upload input */}
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

      {/* Submit button */}
      <button onClick={handleSubmit} className="post-button">
        Post
      </button>
    </div>
  );
}

export default CreatePost;

