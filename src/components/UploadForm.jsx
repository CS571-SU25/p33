import React, { useState } from 'react';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Image uploaded with caption:', caption);
    // 上传图片和信息的逻辑
  };

  return (
    <div className="upload-form">
      <h2>Upload New Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter a caption"
        />
        <button type="submit">Upload</button>
      </form>
      {image && <img src={image} alt="Preview" />}
    </div>
  );
}

export default UploadForm;
