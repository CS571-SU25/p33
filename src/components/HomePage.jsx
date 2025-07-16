import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 模拟图片数据，可以从 API 获取
    setImages([
      {
        id: 1,
        url: 'https://example.com/photo1.jpg',
        caption: 'Beat Saber Arena',
        likes: 10,
        comments: [
          { user: 'User1', comment: 'Looks awesome!' },
          { user: 'User2', comment: 'Amazing!' }
        ]
      },
      // 更多图片...
    ]);
  }, []);

  return (
    <div>
      <h1>Welcome to VRChat SnapShare!</h1>
      <div className="image-stream">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
