import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';
import Footer from '../footer/Footer';
import './BlogLayoutContainer.css';

interface BlogLayoutContainerProps {
  children: React.ReactNode;
}

export const BlogLayoutContainer: React.FC<BlogLayoutContainerProps> = ({ children }) => {
  return (
    <div className="main-content">
      <article className="blog-container">
        <Link to="/blogs" className="blog-nav-back">
          <HiArrowLeft />
          <span>Back to all blogs</span>
        </Link>
        {children}
      </article>
      <Footer />
    </div>
  );
};

export default BlogLayoutContainer;
