import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Footer from '../../components/footer/Footer';

interface BlogPostMeta {
  title: string;
  slug: string;
  desc: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPostMeta[] = [
  {
    title: 'How to Plan and Architect a Modern Full-Stack AI Project',
    slug: 'how-to-plan-a-project',
    desc: 'A comprehensive step-by-step guide on structuring AI middleware, API endpoints, vector storage, and React frontends cleanly.',
    date: 'Aug 2026',
    readTime: '5 min read',
    tags: ['AI Security', 'FastAPI', 'React', 'Architecture'],
  },
];

export const BlogLayout: React.FC = () => {
  return (
    <div className="main-content" style={{ marginTop: '30px' }}>
      <section>
        <SectionTitle>Articles & Insights</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {blogPosts.map((post, idx) => (
            <Link
              key={idx}
              to={`/blogs/${post.slug}`}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {post.date} • {post.readTime}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {post.desc}
              </p>

              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                {post.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 6px',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      color: 'var(--text-tertiary)',
                      borderRadius: '4px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogLayout;
