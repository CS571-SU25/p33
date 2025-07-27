import React, { useState } from 'react';
import './CategoryNav.css';

function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState('推荐');

  const categories = [
    '推荐',
    '关注',
    '热榜',
    'VRChat',
    '游戏',
    '娱乐',
    '科技',
    '时尚',
    '美食',
    '旅行',
    '摄影',
    '艺术',
    '音乐'
  ];

  return (
    <div className="category-nav">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-item ${activeCategory === category ? 'active' : ''}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryNav;