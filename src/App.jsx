import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Import pages and layouts
import Layout from './layouts/Layout/Layout';
import Login from './Login/Login';
import Confirm from './Confirm/Confirm';
import Home from './pages/Home/Home';
import Explorer from './pages/Explorer/Explorer';
import Search from './pages/Search/Search';
import Message from './pages/Message/Message';
// import Notification from './pages/Notification/Notification';
import Profile from './pages/Profile/Profile';
import Bookmark from './pages/Bookmark/Bookmark';
import Followers from './pages/Followers/Followers';
import Following from './pages/Following/Following';
import EditProfile from './pages/Edit profile/Editprofile';
import Aboutdev from './pages/Aboutdev/Aboutdev';

function App() {
  const [posts, setPosts] = useState([]); // All posts
  const [likedPosts, setLikedPosts] = useState([]); // Liked posts
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]); // Bookmarked posts
  const [tab, setTab] = useState('home'); // Track current tab

  // Load posts, likedPosts, and bookmarkedPosts from localStorage on initial render
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);

    const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    setLikedPosts(savedLikedPosts);

    const savedBookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || [];
    setBookmarkedPosts(savedBookmarkedPosts);
  }, []);

  // Save posts, likedPosts, and bookmarkedPosts to localStorage when any of them change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  
  // const handleCreatePost = (content, images) => {
  //   const newPost = {
  //     id: Date.now(),
  //     user: "Heather",
  //     time: new Date().toLocaleString(),
  //     content,
  //     images,
  //     likes: 0,
  //     isLiked: false,
  //     isBookmarked: false,
  //     comments: [], // Comments array for the post
  //   };
  //   const updatedPosts = [newPost, ...posts];
  //   setPosts(updatedPosts);
  // };
  const handleCreatePost = (content, images) => {
    const newPost = {
      id: Date.now(),
      user: "Heather",
      time: new Date().toLocaleString(),
      content,
      images,
      likes: 0,
      isLiked: false,
      isBookmarked: false,
      comments: [],
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // บันทึกโพสต์ลง localStorage
  };
  
  // Function to add a comment to a post
  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        post.comments.push({ id: Date.now(), text: comment }); // Add new comment
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to delete a comment
  const handleDeleteComment = (postId, commentId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        post.comments = post.comments.filter((comment) => comment.id !== commentId);
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to delete a post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Function to like a post
  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && !post.isLiked) {
        post.likes += 1; // Increment likes
        post.isLiked = true;
        setLikedPosts([post, ...likedPosts]);
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to bookmark a post
  const handleBookmarkPost = (post) => {
    if (!bookmarkedPosts.find((p) => p.id === post.id)) {
      setBookmarkedPosts([post, ...bookmarkedPosts]);
    }
  };

  // Function to remove a post from bookmarks
  const handleRemoveBookmark = (postId) => {
    const updatedBookmarkedPosts = bookmarkedPosts.filter((post) => post.id !== postId);
    setBookmarkedPosts(updatedBookmarkedPosts);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Login and Confirm Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home posts={posts} onDeletePost={handleDeletePost} onLikePost={handleLikePost} onBookmarkPost={handleBookmarkPost} onAddComment={handleAddComment} onDeleteComment={handleDeleteComment} onCreatePost={handleCreatePost} />} />
        <Route path="/confirm" element={<Confirm />} />
        
        {/* Profile and Follow Routes */}
        <Route path="/profile" element={<Profile posts={posts} setPosts={setPosts} />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/explorer" element={<Explorer posts={likedPosts} />} />
        <Route path="/bookmark" element={<Bookmark posts={bookmarkedPosts} onRemoveBookmark={handleRemoveBookmark} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/message" element={<Message />} />
        {/* <Route path="/notification" element={<Notification />} /> */}

        {/* Main Application Routes with Layout */}
        
        <Route path="/home" element={<Layout tab={tab} setTab={setTab} onCreatePost={handleCreatePost} />}>
  <Route
    index
    element={
      <Home
        posts={posts}
        onDeletePost={handleDeletePost}
        onLikePost={handleLikePost}
        onBookmarkPost={handleBookmarkPost}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        onCreatePost={handleCreatePost} // ส่งฟังก์ชัน onCreatePost ไปที่ Home
      />
    }
  />
</Route>


        {/* Default 404 Route */}
        <Route path="/aboutdev" element={<Aboutdev />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
