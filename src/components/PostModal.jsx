import React, { useState } from 'react';
import './PostModal.css';

function PostModal({ post, onClose }) {
  const [newComment, setNewComment] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // 这里会调用API添加评论
      console.log('添加评论:', newComment);
      setNewComment('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1天前';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}周前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="img-panel">
          <img src={post.imageUrl} alt={post.title} />
        </div>
        
        <div className="info-panel">
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
            </svg>
          </button>

          <div className="user-info">
            <img src={post.author.avatar} alt={post.author.name} className="user-avatar" />
            <div className="user-details">
              <div className="username">{post.author.name}</div>
            </div>
            <button 
              className={`follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          <div className="post-details">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="post-meta-info">
              <span className="post-time">{formatDate(post.createdAt)}</span>
              <span className="separator">·</span>
              <span className="post-location">{post.location}</span>
            </div>
          </div>

          <div className="comments-section">
            <div className="comments-header">
              <h3>{post.comments.length} Comments</h3>
            </div>
            
            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-username">{comment.author.name}</span>
                      <span className="comment-time">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                    <div className="comment-actions">
                      <button className="comment-action">Like</button>
                      <button className="comment-action">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="comment-input-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <div className="input-actions">
              <button type="button" className="input-action-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>
              </button>
              <button type="button" className="input-action-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
                </svg>
              </button>
              <button type="button" className="input-action-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7L15,11L11,15V13H7A5,5 0 0,0 2,18A5,5 0 0,0 7,23C8.39,23 9.68,22.53 10.72,21.72L9.41,20.41C8.82,20.9 8.02,21.1 7.2,21.1A3,3 0 0,1 4.2,18A3,3 0 0,1 7.2,15H11V13.5L15,17.5L11,21.5V20H7.2C5.96,20 4.81,19.5 3.9,18.6C3.9,17.6 3.9,14.9 3.9,12Z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostModal;