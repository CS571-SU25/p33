# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based social photo sharing platform for VRChat players called "VRChat SnapShare". Users can view, upload, and interact with VRChat screenshots and images.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (outputs to `docs/` directory)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Frontend Structure
- **React 19** with React Router for navigation
- **Bootstrap 5** for styling and layout
- **Vite** as build tool and dev server
- **HashRouter** used for routing (configured for GitHub Pages deployment)

### Key Components
- `App.jsx` - Main app with routing setup using HashRouter
- `Navbar.jsx` - Navigation component with links to all pages
- `HomePage.jsx` - Main feed displaying image cards with mock data
- `ImageCard.jsx` - Individual image post with like/comment/save functionality
- `UploadForm.jsx` - Image upload interface with preview
- `AboutUs.jsx`, `OtherInfo.jsx` - Static content pages

### Build Configuration
- Vite configured with base path `/p0/` for deployment
- Build output goes to `docs/` directory (GitHub Pages compatible)
- ESLint configured for React with hooks and refresh plugins

### State Management
- Uses React hooks (`useState`, `useEffect`) for local component state
- No global state management library currently implemented
- Mock data used in HomePage component for image feed

### Styling
- Bootstrap CSS framework imported globally
- Custom CSS in `App.css` and `index.css`
- Component-specific styling handled inline or via CSS classes