import React, { useState, useEffect } from 'react';
import ContentGrid from './ContentGrid';
import PostModal from './PostModal';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // 模拟帖子数据
    const mockPosts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `VRChat精彩瞬间 ${i + 1}`,
      imageUrl: `https://picsum.photos/400/600?random=${i + 1}`,
      author: {
        id: `user${i + 1}`,
        name: `用户${i + 1}`,
        avatar: `https://picsum.photos/40/40?random=${i + 100}`
      },
      likes: Math.floor(Math.random() * 1000) + 10,
      content: `这是一个精彩的VRChat瞬间！在虚拟世界中体验到了前所未有的乐趣和互动。${i + 1}`,
      tags: ['VRChat', '虚拟现实', '游戏'],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'VRChat世界',
      comments: [
        {
          id: 1,
          author: {
            name: `评论者${i + 1}`,
            avatar: `https://picsum.photos/30/30?random=${i + 200}`
          },
          content: '太棒了！',
          createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          author: {
            name: `评论者${i + 2}`,
            avatar: `https://picsum.photos/30/30?random=${i + 300}`
          },
          content: '我也想去这个世界！',
          createdAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
        }
      ]
    }));
    
    setPosts(mockPosts);
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="home-page">
      <ContentGrid posts={posts} onPostClick={handlePostClick} />
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default HomePage;
