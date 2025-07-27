# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based social photo sharing platform for VRChat players called "VRChat SnapShare", designed with a Xiaohongshu (Little Red Book) dark theme aesthetic. Users can view, upload, and interact with VRChat screenshots and images in a modern, Instagram-like interface.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (outputs to `docs/` directory)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Design System
- **Dark Theme**: Xiaohongshu-inspired color scheme with `#090909` background
- **CSS Variables**: Centralized design tokens in `src/variables.css`
- **Component Library**: Custom components following Material Design principles
- **Responsive Grid**: 5-column masonry layout with responsive breakpoints

### Frontend Structure
- **React 19** with React Router (HashRouter) for navigation
- **Custom CSS System** replacing Bootstrap with modular component styles
- **Vite** as build tool and dev server
- **Modern Hooks**: Custom hooks for infinite scroll and state management

### Layout Components
- `Layout.jsx` - Main layout wrapper with fixed header and sidebar
- `Header.jsx` - Top navigation with logo, search bar, and nav links (64px height)
- `Sidebar.jsx` - Left navigation panel with discovery, upload, notifications (240px width)
- `CategoryNav.jsx` - Horizontal category tabs below header (56px height)

### Content Components
- `ContentGrid.jsx` - 5-column responsive grid container for posts
- `PostCard.jsx` - Individual post cards with 3:4 aspect ratio images
- `PostModal.jsx` - Full-screen post detail modal (80vw × 80vh)
- `HomePage.jsx` - Main feed with infinite scroll and search functionality
- `UploadForm.jsx` - Drag-and-drop upload interface with form validation

### Features
- **Infinite Scroll**: Custom `useInfiniteScroll` hook for pagination
- **Real-time Search**: Filter posts by title, content, author, or tags
- **Image Upload**: Drag-and-drop with preview and validation
- **Modal System**: Full-screen post details with comments
- **Responsive Design**: Mobile-first approach with breakpoints

### State Management
- React hooks (`useState`, `useEffect`, `useCallback`) for local state
- Search state managed at App level and passed down
- Mock data generation for development and testing
- No external state management library required

### Styling Approach
- **CSS Variables**: Design tokens in `:root` for colors, fonts, spacing
- **Component CSS**: Each component has its own CSS file
- **Utility Classes**: Minimal utility classes for common patterns
- **Dark Theme**: Consistent dark color palette throughout

### File Structure
```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── variables.css       # Design system variables
├── App.jsx            # Main app with routing
└── main.jsx           # Application entry point
```

### Build Configuration
- Vite configured with base path `/p0/` for GitHub Pages deployment
- Build output goes to `docs/` directory
- ESLint configured for React with hooks and refresh plugins
- CSS modules support for component-scoped styles

### Development Notes
- Use `variables.css` for all color and spacing values
- Follow the established component structure with separate CSS files
- Maintain 3:4 aspect ratio for post images
- Ensure all interactive elements have hover states
- Test responsive design at multiple breakpoints
- Use semantic HTML and proper accessibility attributes