import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostsContext';
import './UploadForm.css';

function UploadForm() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addPost } = usePosts();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // 验证规则
  const validateTitle = (title) => {
    if (!title || title.trim().length === 0) return 'Title is required.';
    if (title.trim().length > 50) return 'Title must be 50 characters or less.';
    return '';
  };

  const validateContent = (content) => {
    if (!content || content.trim().length === 0) return 'Content is required.';
    if (content.trim().length > 1000) return 'Content must be 1000 characters or less.';
    return '';
  };

  const validateImages = (images) => {
    if (!images || images.length === 0) return 'Please select at least one image.';
    if (images.length > 5) return 'Maximum 5 images allowed.';
    return '';
  };

  // 实时验证处理
  const handleTitleBlur = () => {
    const error = validateTitle(title);
    setErrors(prev => ({ ...prev, title: error }));
  };

  const handleContentBlur = () => {
    const error = validateContent(content);
    setErrors(prev => ({ ...prev, content: error }));
  };

  const isFormValid = () => {
    const titleError = validateTitle(title);
    const contentError = validateContent(content);
    const imagesError = validateImages(images);
    
    return !titleError && !contentError && !imagesError;
  };

  const compressAndConvertToBase64 = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // 计算新尺寸，保持纵横比
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // 绘制压缩后的图片
        ctx.drawImage(img, 0, 0, width, height);
        
        // 转换为base64，使用JPEG格式减小文件大小
        const base64 = canvas.toDataURL('image/jpeg', quality);
        
        // 清理临时URL
        URL.revokeObjectURL(img.src);
        
        resolve(base64);
      };
      
      img.onerror = () => {
        // 如果图片加载失败，清理临时URL并拒绝Promise
        URL.revokeObjectURL(img.src);
        resolve(null);
      };
      
      // 创建临时URL用于Image加载
      img.src = URL.createObjectURL(file);
    });
  };

  const convertFileToBase64 = (file) => {
    // 检查文件大小，如果超过2MB则压缩
    if (file.size > 2 * 1024 * 1024) {
      return compressAndConvertToBase64(file, 800, 0.7);
    } else {
      return compressAndConvertToBase64(file, 1200, 0.9);
    }
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      try {
        const newImages = await Promise.all(
          files.slice(0, 5).map(async (file) => {
            const url = await convertFileToBase64(file);
            if (!url) {
              console.error('Failed to convert file to base64:', file.name);
              return null;
            }
            return {
              id: Date.now() + Math.random(),
              url: url,
              file: file
            };
          })
        );
        
        // 过滤掉转换失败的图片
        const validImages = newImages.filter(img => img !== null);
        
        if (validImages.length > 0) {
          setImages(prev => [...prev, ...validImages].slice(0, 5));
          // 清除图片错误
          setErrors(prev => ({ ...prev, images: '' }));
        }
      } catch (error) {
        console.error('Error processing files:', error);
        alert('Error processing images. Please try again.');
      }
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      try {
        const newImages = await Promise.all(
          files.slice(0, 5).map(async (file) => {
            const url = await convertFileToBase64(file);
            if (!url) {
              console.error('Failed to convert file to base64:', file.name);
              return null;
            }
            return {
              id: Date.now() + Math.random(),
              url: url,
              file: file
            };
          })
        );
        
        // 过滤掉转换失败的图片
        const validImages = newImages.filter(img => img !== null);
        
        if (validImages.length > 0) {
          setImages(prev => [...prev, ...validImages].slice(0, 5));
          // 清除图片错误
          setErrors(prev => ({ ...prev, images: '' }));
        }
      } catch (error) {
        console.error('Error processing files:', error);
        alert('Error processing images. Please try again.');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      // 清理所有临时URLs（如果有的话）
      images.forEach(img => {
        if (img.url && img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, [images]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 全面验证
    const titleError = validateTitle(title);
    const contentError = validateContent(content);
    const imagesError = validateImages(images);
    
    setErrors({
      title: titleError,
      content: contentError,
      images: imagesError
    });
    
    if (!isFormValid()) {
      return;
    }
    
    setIsUploading(true);

    try {
      // 模拟API调用 POST /api/posts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 创建新帖子对象 - 使用base64图片数据确保持久化存储
      const newPost = {
        id: `user-post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title.trim(),
        content: content.trim(),
        description: content.trim(), // 添加description字段用于搜索
        imageUrl: images[0]?.url, // 主图片base64（第一张图片）
        image: images[0]?.url, // 添加image字段（PostCard组件需要）
        images: images.map(img => img.url), // 所有图片base64 URLs
        media: images.map((img, index) => ({
          type: 'image',
          url: img.url, // base64数据
          id: `media-${index}`
        })), // 添加media字段用于PostModal轮播
        author: {
          id: user?.id || 'current-user',
          name: user?.name || 'Anonymous User',
          username: user?.username || user?.name || 'user',
          email: user?.email || 'anonymous@example.com',
          avatar: user?.avatar || 'https://picsum.photos/40/40?random=user'
        },
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        location: location.trim() || 'Unknown Location',
        likesCount: 0, // 添加likesCount字段
        savesCount: 0, // 添加savesCount字段
        likes: 0, // 保持兼容性
        comments: [],
        createdAt: new Date().toISOString(),
        isPrivate: false, // 添加私密标记
        isDraft: false // 添加草稿标记
      };
      
      // 添加到帖子列表
      console.log('📤 准备添加新帖子到上下文:', newPost);
      addPost(newPost);
      console.log('✅ 新帖子已添加到PostsContext');
      
      // 上传成功，跳转到首页
      alert('Post published successfully!');
      navigate('/');
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handlePublishClick = () => {
    // 强制触发所有字段验证以显示错误
    const titleError = validateTitle(title);
    const contentError = validateContent(content);
    const imagesError = validateImages(images);
    
    setErrors({
      title: titleError,
      content: contentError,
      images: imagesError
    });
  };

  // 检查用户是否已登录
  if (!isAuthenticated) {
    return (
      <div className="upload-page">
        <div className="upload-error">
          <h2>Login Required</h2>
          <p>You need to log in to create a post.</p>
          <button 
            className="login-redirect-btn"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Create Post</h1>
        
        <div className="upload-content">
          <div className="upload-left">
            <div 
              className={`upload-area ${isDragging ? 'dragging' : ''} ${images.length > 0 ? 'has-images' : ''} ${errors.images ? 'error' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {images.length > 0 ? (
                <div className="images-preview">
                  <div className="preview-grid">
                    {images.map((image, index) => (
                      <div key={image.id} className="image-preview-item">
                        <img src={image.url} alt={`Preview ${index + 1}`} />
                        <button 
                          type="button" 
                          className="remove-image-btn"
                          onClick={() => removeImage(image.id)}
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                          </svg>
                        </button>
                        {index === 0 && (
                          <div className="main-image-badge">
                            <span>Cover</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {images.length < 5 && (
                      <div className="add-more-images">
                        <button 
                          type="button" 
                          className="add-image-btn"
                          onClick={() => document.getElementById('file-input').click()}
                        >
                          <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                          </svg>
                          <span>Add Image</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="image-count">
                    {images.length} / 5 images
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <p>Drag images here or click to select</p>
                  <p className="upload-hint">Supports JPG, PNG formats (Max 5 images)</p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            {errors.images && (
              <div className="upload-error-message" role="alert">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                </svg>
                {errors.images}
              </div>
            )}
          </div>

          <div className="upload-right">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="title-input">Title *</label>
                <input
                  id="title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  placeholder="Enter title (required)"
                  maxLength={50}
                  required
                  aria-required="true"
                  aria-describedby={errors.title ? "title-error" : undefined}
                  className={errors.title ? 'input-error' : ''}
                />
                <div className="field-bottom">
                  <span className="char-count">{title.length}/50</span>
                </div>
                {errors.title && (
                  <div className="field-error-message" id="title-error" role="alert">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                    </svg>
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="content-input">Content *</label>
                <textarea
                  id="content-input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onBlur={handleContentBlur}
                  placeholder="Share your VRChat moments... (required)"
                  maxLength={1000}
                  rows={6}
                  required
                  aria-required="true"
                  aria-describedby={errors.content ? "content-error" : undefined}
                  className={errors.content ? 'input-error' : ''}
                />
                <div className="field-bottom">
                  <span className="char-count">{content.length}/1000</span>
                </div>
                {errors.content && (
                  <div className="field-error-message" id="content-error" role="alert">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                    </svg>
                    {errors.content}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tags-input">Tags</label>
                <input
                  id="tags-input"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Separate tags with commas, e.g: VRChat, VirtualReality, Gaming"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location-input">Location</label>
                <input
                  id="location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VRChat world name"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="publish-btn" 
                  disabled={isUploading}
                  onClick={handlePublishClick}
                >
                  {isUploading ? 'Publishing...' : 'Publish'}
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
