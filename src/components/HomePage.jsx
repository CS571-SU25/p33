import React, { useState, useEffect, useCallback } from 'react';
import ContentGrid from './ContentGrid';
import PostModal from './PostModal';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './HomePage.css';

function HomePage({ searchTerm }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const generateMockPosts = (startIndex, count) => {
    return Array.from({ length: count }, (_, i) => {
      const index = startIndex + i;
      return {
        id: index,
        title: `VRChat精彩瞬间 ${index}`,
        imageUrl: `https://picsum.photos/400/600?random=${index}`,
        author: {
          id: `user${index}`,
          name: `用户${index}`,
          avatar: `https://picsum.photos/40/40?random=${index + 100}`
        },
        likes: Math.floor(Math.random() * 1000) + 10,
        content: `这是一个精彩的VRChat瞬间！在虚拟世界中体验到了前所未有的乐趣和互动。${index}`,
        tags: ['VRChat', '虚拟现实', '游戏'],
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'VRChat世界',
        comments: [
          {
            id: 1,
            author: {
              name: `评论者${index}`,
              avatar: `https://picsum.photos/30/30?random=${index + 200}`
            },
            content: '太棒了！',
            createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            author: {
              name: `评论者${index + 1}`,
              avatar: `https://picsum.photos/30/30?random=${index + 300}`
            },
            content: '我也想去这个世界！',
            createdAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
          }
        ]
      };
    });
  };

  useEffect(() => {
    // 初始加载
    const initialPosts = generateMockPosts(1, 20);
    setPosts(initialPosts);
    setFilteredPosts(initialPosts);
  }, []);

  useEffect(() => {
    // 搜索过滤
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const loadMorePosts = useCallback(async () => {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPage = page + 1;
    const newPosts = generateMockPosts((newPage - 1) * 20 + 1, 20);
    
    const updatedPosts = [...posts, ...newPosts];
    setPosts(updatedPosts);
    setFilteredPosts(searchTerm ? updatedPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : updatedPosts);
    setPage(newPage);
    
    // 模拟有限数据，最多10页
    return newPage < 10;
  }, [page, posts, searchTerm]);

  const { isLoading } = useInfiniteScroll(loadMorePosts);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="home-page">
      {searchTerm && (
        <div className="search-result-header">
          <h3>搜索 "{searchTerm}" 的结果：{filteredPosts.length} 条</h3>
        </div>
      )}
      <ContentGrid posts={filteredPosts} onPostClick={handlePostClick} />
      {!searchTerm && isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>加载更多...</span>
        </div>
      )}
      {searchTerm && filteredPosts.length === 0 && (
        <div className="no-results">
          <p>没有找到相关内容</p>
          <p>尝试使用其他关键词</p>
        </div>
      )}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default HomePage;
