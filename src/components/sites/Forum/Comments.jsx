import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './styles/ChooseForum.module.css'
import { AuthContext } from '../../account/Authcontext'
import { Button } from 'react-bootstrap'
import { useStatus } from '../../status/StatusContext';

const Comments = () => {
  const { topic, theme, postid } = useParams()
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [newComment, setNewComment] = useState({ description: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const { updateStatus } = useStatus()

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [page, postid])

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/forum/newtopic/${postid}`)
      setPost(response.data)
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/forum/newtopic/${postid}/comments`, {
        params: { page },
      })
      setComments(response.data.comments)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    if (token) {
      const headers = { 'Authorization': `Bearer ${token}` }
      const commentData = {
        topicid: postid,
        text: newComment.description,
        catagory: topic,
        maintheme: theme
      }

      try {
        if (isEditing) {
         const response = await axios.put(`${process.env.REACT_APP_API_URL}/forum/comments/${editingCommentId}`, commentData, { headers })
          setIsEditing(false)
          setEditingCommentId(null)
          updateStatus(response.status, response.data.message)
        } else {
        const response =  await axios.post(`${process.env.REACT_APP_API_URL}/forum/newtopic/comments`, commentData, { headers })

        updateStatus(response.status, response.data.message)
        }
        setNewComment({ description: '' })
        fetchComments()
      } catch (error) {
        updateStatus(error.response.status, error.response.data.message)
      }
    }
  }

  const handleRemoveComment = async (commentId) => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
       const response = await axios.delete(`${process.env.REACT_APP_API_URL}/forum/comments/${commentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        updateStatus(response.status, response.data.message)
        fetchComments()
      } catch (error) {
        console.error('Error removing comment:', error)
      }
    }
  }

  const addCommentButtons = (commentUserName, commentId, comment) => {
    if (auth.user && (commentUserName === auth.user || commentUserName === auth.user.sub)) {
      return (
        <>
          <Button onClick={() => handleUpdateComment(comment) } variant='warning'>Update</Button>
          <Button onClick={() => handleRemoveComment(commentId)} variant='danger'>Remove</Button>
        </>
      )
    }
    return null
  }

  const handleUpdateComment = (comment) => {
    setNewComment({ description: comment.text })
    setIsEditing(true)
    setEditingCommentId(comment._id)
  }

  const getCommentStyle = (commentUserName) => {
    if (auth.user) {
      if (auth.user.role === 'admin') {
        return { color: 'red' }
      } else if (commentUserName === auth.user || commentUserName === auth.user.sub) {
        return { color: 'yellow' }
      }
    }
    return { color: 'green' }
  }

  return (
    <div className={styles.fulldiv}>
      <div className={styles.forum}>
        <h1>Forum: {topic} - {theme}</h1>
        <form onSubmit={handleCommentSubmit} className={styles.postForm}>
          <textarea
            value={newComment.description}
            onChange={(e) => setNewComment({ ...newComment, description: e.target.value })}
            placeholder="Comment"
            required
          ></textarea>
          {isEditing ? <><Button variant='warning' type='submit'>Update Comment</Button></> : <Button variant='success' type='submit'> New Comment</Button>}
        </form>
        {post && (
          <div className={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </div>
        )}
        
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <p style={getCommentStyle(comment.username)}>{comment.username}</p>
              <p>{comment.text}</p>
              <div className={styles.actionbuttons}> 
              {addCommentButtons(comment.username, comment._id, comment)}
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
  )
}

export default Comments
