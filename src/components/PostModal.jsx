import React, { useState, useEffect, useRef } from 'react';
import { usePosts } from '../contexts/PostsContext';
import './PostModal.css';

const PostModal = ({ post, isOpen, onClose }) => {
  const { addComment, updateLikeCount, updateSaveCount, posts } = usePosts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && post) {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
      
      setIsLiked(likedPosts.includes(post.id));
      setIsSaved(savedPosts.includes(post.id));
      setComments(post.comments || []);
      setCurrentSlide(0);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Keyboard event handlers
      const handleKeyDown = (e) => {
        switch (e.key) {
          case 'Escape':
            onClose();
            break;
          case 'ArrowLeft':
            prevSlide();
            break;
          case 'ArrowRight':
            nextSlide();
            break;
          case 'l':
          case 'L':
            if (!e.ctrlKey && !e.metaKey) handleLike();
            break;
          case 's':
          case 'S':
            if (!e.ctrlKey && !e.metaKey) handleSave();
            break;
          case 'c':
          case 'C':
            if (!e.ctrlKey && !e.metaKey) focusCommentBox();
            break;
        }
      };

      // Listen for custom events to sync states with other components
      const handleLikeChange = (e) => {
        if (e.detail.postId === post.id) {
          setIsLiked(e.detail.isLiked);
        }
      };

      const handleSaveChange = (e) => {
        if (e.detail.postId === post.id) {
          setIsSaved(e.detail.isSaved);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('postLikeChange', handleLikeChange);
      window.addEventListener('postSaveChange', handleSaveChange);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('postLikeChange', handleLikeChange);
        window.removeEventListener('postSaveChange', handleSaveChange);
      };
    }
  }, [isOpen, post]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    
    if (isLiked) {
      const updated = likedPosts.filter(id => id !== post.id);
      localStorage.setItem('likedPosts', JSON.stringify(updated));
    } else {
      likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
    
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    updateLikeCount(post.id, newLikedState);
    
    // Dispatch custom event to sync with other components
    window.dispatchEvent(new CustomEvent('postLikeChange', {
      detail: { postId: post.id, isLiked: newLikedState }
    }));
  };

  const handleSave = () => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    
    if (isSaved) {
      const updated = savedPosts.filter(id => id !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(updated));
    } else {
      savedPosts.push(post.id);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    }
    
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    updateSaveCount(post.id, newSavedState);
    
    // Dispatch custom event to sync with other components
    window.dispatchEvent(new CustomEvent('postSaveChange', {
      detail: { postId: post.id, isSaved: newSavedState }
    }));
  };

  const handleShare = () => {
    const currentPost = posts.find(p => p.id === post.id) || post;
    if (navigator.share) {
      navigator.share({
        title: currentPost.title,
        text: currentPost.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const focusCommentBox = () => {
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
      commentInput.focus();
    }
  };

  const nextSlide = () => {
    const mediaCount = post.media ? post.media.length : 1;
    setCurrentSlide((prev) => (prev + 1) % mediaCount);
  };

  const prevSlide = () => {
    const mediaCount = post.media ? post.media.length : 1;
    setCurrentSlide((prev) => (prev - 1 + mediaCount) % mediaCount);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = addComment(post.id, commentText.trim());
      setComments(prev => [...prev, newComment]);
      setCommentText('');
    }
  };

  if (!isOpen || !post) return null;

  // Get the most up-to-date post data from context
  const currentPost = posts.find(p => p.id === post.id) || post;
  
  const mediaItems = currentPost.media || [{ type: 'image', url: currentPost.image || currentPost.imageUrl }];
  const hasMultipleMedia = mediaItems.length > 1;

  return (
    <div 
      className={`post-modal ${isOpen ? 'open' : ''}`}
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="panel">
        {/* Media Section */}
        <section className="media">
          <div className="swiper">
            <div className="slide active">
              {mediaItems[currentSlide]?.type === 'video' ? (
                <video 
                  src={mediaItems[currentSlide].url} 
                  controls 
                  autoPlay 
                  muted 
                  loop
                />
              ) : (
                <img 
                  src={mediaItems[currentSlide]?.url} 
                  alt={currentPost.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>
          </div>
          
          {hasMultipleMedia && (
            <>
              <button className="nav prev" onClick={prevSlide}>‹</button>
              <button className="nav next" onClick={nextSlide}>›</button>
              <div className="dots">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Action Rail */}
        <aside className="rail">
          <button 
            className={`rail-btn ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
            data-act="like"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{currentPost.likesCount || 0}</span>
          </button>
          
          <button 
            className="rail-btn"
            onClick={scrollToComments}
            data-act="comment"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            <span>Comment</span>
          </button>
          
          <button 
            className={`rail-btn ${isSaved ? 'active' : ''}`}
            onClick={handleSave}
            data-act="save"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <span>{currentPost.savesCount || 0}</span>
          </button>
          
          <button 
            className="rail-btn"
            onClick={handleShare}
            data-act="share"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span>Share</span>
          </button>
        </aside>

        {/* Content Sheet */}
        <article className="sheet">
          <header>
            <img 
              className="avatar" 
              src={currentPost.author?.avatar || '/default-avatar.png'} 
              alt={currentPost.author?.name || 'User'}
            />
            <div className="author">
              <h2 className="title">{currentPost.title}</h2>
              <span className="nick">@{currentPost.author?.username || currentPost.author?.name || 'user'}</span>
            </div>
          </header>

          <section className="body">
            <p>{currentPost.content || currentPost.description || 'No description available.'}</p>
          </section>

          <section className="comments" id="comments">
            <h3>Comments</h3>
            <div className="comment-list">
              {comments.length > 0 ? comments.map((comment, index) => (
                <div key={comment.id || index} className="comment">
                  <img 
                    className="comment-avatar" 
                    src={comment.author?.avatar || '/default-avatar.png'}
                    alt={comment.author?.name || 'User'}
                  />
                  <div className="comment-content">
                    <strong>{comment.author?.name || 'Anonymous'}</strong>
                    <p>{comment.text}</p>
                    <span className="comment-time">{comment.timestamp}</span>
                  </div>
                </div>
              )) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </section>

          {/* Quick Reply */}
          <div className="quick-reply">
            <form onSubmit={handleCommentSubmit}>
              <input
                id="comment-input"
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit" disabled={!commentText.trim()}>
                Post
              </button>
            </form>
          </div>
        </article>

        {/* Close button */}
        <button className="close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostModal;