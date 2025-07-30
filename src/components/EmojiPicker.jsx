import React, { useState, useRef, useEffect } from 'react';
import './EmojiPicker.css';

const EmojiPicker = ({ isOpen, onClose, onEmojiSelect, position }) => {
  const [selectedCategory, setSelectedCategory] = useState('smileys');
  const pickerRef = useRef(null);

  const emojiCategories = {
    smileys: {
      name: '表情',
      icon: '😀',
      emojis: [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
        '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
        '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
        '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
        '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
      ]
    },
    people: {
      name: '人物',
      icon: '👤',
      emojis: [
        '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓',
        '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🧏', '🙇',
        '🤦', '🤷', '👮', '🕵', '💂', '🥷', '👷', '🤴', '👸', '👳',
        '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼', '🎅', '🤶', '🦸',
        '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '💆', '💇'
      ]
    },
    nature: {
      name: '自然',
      icon: '🌿',
      emojis: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
        '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
        '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
        '🪲', '🪳', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕'
      ]
    },
    food: {
      name: '食物',
      icon: '🍎',
      emojis: [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
        '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
        '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠',
        '🥐', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇',
        '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪'
      ]
    },
    activities: {
      name: '活动',
      icon: '⚽',
      emojis: [
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
        '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳',
        '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷',
        '⛸', '🥌', '🎿', '⛷', '🏂', '🪂', '🏋', '🤼', '🤸', '⛹',
        '🤺', '🤾', '🏌', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗'
      ]
    },
    travel: {
      name: '旅行',
      icon: '🚗',
      emojis: [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐',
        '🛻', '🚚', '🚛', '🚜', '🏍', '🛵', '🚲', '🛴', '🛹', '🛼',
        '🚁', '🛸', '✈', '🛩', '🪂', '💺', '🚀', '🛰', '🚢', '⛵',
        '🚤', '🛥', '🛳', '⛴', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇',
        '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🎡', '🎢'
      ]
    },
    objects: {
      name: '物品',
      icon: '💎',
      emojis: [
        '⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹',
        '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
        '📽', '🎞', '📞', '☎', '📟', '📠', '📺', '📻', '🎙', '🎚',
        '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛', '⏳', '📡', '🔋',
        '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴'
      ]
    },
    symbols: {
      name: '符号',
      icon: '❤️',
      emojis: [
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
        '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
        '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐',
        '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
        '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳'
      ]
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="emoji-picker-overlay"
      style={position ? {
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000
      } : {}}
    >
      <div className="emoji-picker" ref={pickerRef}>
        <div className="emoji-picker-header">
          <div className="emoji-categories">
            {Object.entries(emojiCategories).map(([key, category]) => (
              <button
                key={key}
                className={`emoji-category ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
                title={category.name}
              >
                {category.icon}
              </button>
            ))}
          </div>
        </div>
        
        <div className="emoji-grid">
          {emojiCategories[selectedCategory].emojis.map((emoji, index) => (
            <button
              key={index}
              className="emoji-button"
              onClick={() => handleEmojiClick(emoji)}
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;