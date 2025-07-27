import React, { useState } from 'react';
import './UploadForm.css';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('上传内容:', {
      image,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      location
    });
    // 这里会调用API上传
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Create Post</h1>
        
        <div className="upload-content">
          <div className="upload-left">
            <div 
              className={`upload-area ${isDragging ? 'dragging' : ''} ${image ? 'has-image' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {image ? (
                <div className="image-preview">
                  <img src={image} alt="预览" />
                  <div className="image-overlay">
                    <button 
                      type="button" 
                      className="change-image-btn"
                      onClick={() => document.getElementById('file-input').click()}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <p>Drag image here or click to select</p>
                  <p className="upload-hint">Supports JPG, PNG formats</p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="upload-right">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title (required)"
                  maxLength={50}
                  required
                />
                <span className="char-count">{title.length}/50</span>
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your VRChat moments..."
                  maxLength={1000}
                  rows={6}
                />
                <span className="char-count">{content.length}/1000</span>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Separate tags with commas, e.g: VRChat, VirtualReality, Gaming"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VRChat world name"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="publish-btn" disabled={!image || !title}>
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
