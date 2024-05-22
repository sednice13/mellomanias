import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/ChooseForum.module.css';
import { AuthContext } from '../../account/Authcontext';
import { Button } from 'react-bootstrap';
import { useStatus } from '../../status/StatusContext';

const Forum = () => {
  const { topic, theme } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateStatus } = useStatus()
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [page, topic, theme]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/forum/topics/${topic}/${theme}`, {
        params: { page },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleNavigate = (pageId) => {
    navigate(`/topics/${topic.toLowerCase()}/${theme}/${pageId}`);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      const postData = {
        catagory: topic,
        maintheme: theme,
        title: newPost.title,
        text: newPost.description,
      };

      try {
        if (isEditing) {
          const response = await axios.put(`http://localhost:8080/forum/posts/${editingPostId}`, postData, { headers });
          updateStatus(response.status, response.data.message)
          setIsEditing(false);
          setEditingPostId(null);
        } else {
        const response =  await axios.post(`http://localhost:8080/forum/newtopic`, postData, { headers });
        updateStatus(response.status, response.data.message)
        }
        setNewPost({ title: '', description: '' });
        fetchPosts();
      } catch (error) {
        updateStatus(error.status, error.data.message)
      }
    }
  };

  const handleRemovePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
      const response =  await axios.delete(`http://localhost:8080/forum/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        updateStatus(response.status, response.data.message)

        fetchPosts();
      } catch (error) {
        console.error('Error removing post:', error);
      }
    }
  };

  const addPostButtons = (postUserName, postId, post) => {
    if (auth.user && (postUserName === auth.user || postUserName === auth.user.sub)) {
      return (
        <>
          <Button type="button" variant='warning' onClick={() => handleUpdatePost(post)}>Update</Button>
          <Button type="button" onClick={() => handleRemovePost(postId)} variant='danger'>Remove</Button>
        </>
      );
    }
    return null;
  };

  const handleUpdatePost = (post) => {
    setNewPost({ title: post.title, description: post.text });
    setIsEditing(true);
    setEditingPostId(post._id);
  };

  return (
    <div className={styles.fulldiv}>
      <div className={styles.forum}>
        <h1>Forum: {topic} - {theme}</h1>
        <form onSubmit={handlePostSubmit} className={styles.postForm}>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Title"
            required
          />
          <textarea
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            placeholder="Description"
            required
          ></textarea>
          {isEditing ? (
            <Button variant="warning" type="submit">Update Post</Button>
          ) : (
            <Button variant="success" type="submit">New Post</Button>
          )}
        </form>

        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <p>{post.username}</p>
              <h2 onClick={() => handleNavigate(post._id)}>{post.title}</h2>
              <p>{post.text}</p>
              <div className={styles.actionbuttons}>
              {addPostButtons(post.username, post._id, post)}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forum;





