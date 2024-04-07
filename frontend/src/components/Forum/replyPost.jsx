import React, { useState, useEffect, useContext } from 'react';
import styles from './replyPost.module.css';
import Header from '../header/header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const backendURL = "http://localhost:4000";

const ReplyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/posts`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchReplies = async (postId) => {
    try {
      const response = await axios.get(`${backendURL}/api/posts/replies/${postId}`);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleBlogSelect = (event) => {
    const blogId = event.target.value;
    const selected = blogs.find(blog => blog.id === parseInt(blogId));
    setSelectedBlog(selected);
    if (selected) {
      fetchReplies(selected.id);
    }
  };

  const handleSubmitReply = async (event) => {
    event.preventDefault();
    try {
      if (!user || !user.id) {
        console.error('User ID is not available.');
        return;
      }
  
      if (!selectedBlog || !selectedBlog.id) {
        console.error('Selected blog ID is not available.');
        return;
      }
  
      const replyData = {
        postid: selectedBlog.id,
        body: replyText,
        author: user.id,
      };
  
      const response = await axios.post(`${backendURL}/api/posts/reply`, replyData);
  
      console.log('Reply submitted:', response.data);
  
      fetchReplies(selectedBlog.id);
  
      setReplyText('');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error submitting reply:', error.response.data);
      } else {
        console.error('Error submitting reply:', error.message);
      }
    }
  };
  
  const renderReplies = () => {
    return replies.map(reply => (
      <div key={reply.id} className={styles.reply}>
        <div className={styles.replyText}>
          <p>{reply.body}</p>
          <hr className={styles.separator} />
          <p>Author: {reply.author}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h1>Reply to Blog</h1>
        <hr className={styles.separator} />
        <div className={styles.dropdown}>
          <select id='blogSelect' onChange={handleBlogSelect}>
            <option value=''>Select a Blog</option>
            {blogs.map(blog => (
              <option key={blog.id} value={blog.id}>
                {blog.title}
              </option>
            ))}
          </select>
        </div>
        {selectedBlog && (
          <div className={styles.selectedBlog}>
            <h2>{selectedBlog.title}</h2>
            <p>Author: {selectedBlog.author}</p>
            <p>Date: {new Date(selectedBlog.date).toLocaleDateString()}</p>
            <hr className={styles.separator} />
            <p>{selectedBlog.body}</p>
          </div>
        )}
        <hr className={styles.separator} />
        <h2>Replies:</h2>
        {replies.length > 0 ? (
          <div className={styles.repliesList}>
            {renderReplies()}
          </div>
        ) : (
          <p>This post has no replies.</p>
        )}

        <form onSubmit={handleSubmitReply} className={styles.replyForm}>
          <div className={styles.inputBox}>
            <textarea
              placeholder='Enter your reply...'
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            />
          </div>
          <button type='submit' className={styles.submitButton}>Submit Reply</button>
          <div className={styles.buttonContainer}>
            <Link to="/Forum" className={styles.backLink}>
              Back to Forum
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyBlog;
