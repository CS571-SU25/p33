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
        <h1 className="upload-title">发布笔记</h1>
        
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
                      更换图片
                    </button>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <p>拖拽图片到这里，或点击选择</p>
                  <p className="upload-hint">支持 JPG、PNG 格式</p>
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
                <label>标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入标题（必填）"
                  maxLength={50}
                  required
                />
                <span className="char-count">{title.length}/50</span>
              </div>

              <div className="form-group">
                <label>正文</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="分享你的VRChat精彩瞬间..."
                  maxLength={1000}
                  rows={6}
                />
                <span className="char-count">{content.length}/1000</span>
              </div>

              <div className="form-group">
                <label>标签</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="用逗号分隔标签，如：VRChat,虚拟现实,游戏"
                />
              </div>

              <div className="form-group">
                <label>位置</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VRChat世界名称"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn">
                  取消
                </button>
                <button type="submit" className="publish-btn" disabled={!image || !title}>
                  发布
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
