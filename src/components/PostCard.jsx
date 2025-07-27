import React from 'react';
import './PostCard.css';

function PostCard({ post, onClick }) {
  return (
    <div className="post-card" onClick={() => onClick(post)}>
      <div className="post-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>
      <div className="post-content">
        <div className="post-title">{post.title}</div>
        <div className="post-meta">
          <img src={post.author.avatar} alt={post.author.name} className="avatar" />
          <span className="username">{post.author.name}</span>
          <div className="post-actions">
            <button className="icon-button" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
              </svg>
              <span className="action-count">{post.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;