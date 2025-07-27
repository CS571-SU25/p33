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
        title: `Amazing VRChat Moment ${index}`,
        imageUrl: `https://picsum.photos/400/600?random=${index}`,
        author: {
          id: `user${index}`,
          name: `User${index}`,
          avatar: `https://picsum.photos/40/40?random=${index + 100}`
        },
        likes: Math.floor(Math.random() * 1000) + 10,
        content: `This is an amazing VRChat moment! Experiencing unprecedented fun and interaction in the virtual world. #${index}`,
        tags: ['VRChat', 'VirtualReality', 'Gaming'],
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'VRChat World',
        comments: [
          {
            id: 1,
            author: {
              name: `Commenter${index}`,
              avatar: `https://picsum.photos/30/30?random=${index + 200}`
            },
            content: 'Awesome!',
            createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            author: {
              name: `Commenter${index + 1}`,
              avatar: `https://picsum.photos/30/30?random=${index + 300}`
            },
            content: 'I want to visit this world too!',
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
          <h3>Search results for "{searchTerm}": {filteredPosts.length} posts</h3>
        </div>
      )}
      <ContentGrid posts={filteredPosts} onPostClick={handlePostClick} />
      {!searchTerm && isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Loading more...</span>
        </div>
      )}
      {searchTerm && filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No results found</p>
          <p>Try using different keywords</p>
        </div>
      )}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default HomePage;
