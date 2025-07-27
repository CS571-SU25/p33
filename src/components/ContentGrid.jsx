import React from 'react';
import PostCard from './PostCard';
import './ContentGrid.css';

function ContentGrid({ posts, onPostClick }) {
  return (
    <div className="content-grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={onPostClick}
        />
      ))}
    </div>
  );
}

export default ContentGrid;