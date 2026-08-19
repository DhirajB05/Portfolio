import React from 'react';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Footer from '../../components/footer/Footer';
import { usesData } from '../../data/uses';
import './UsesLayout.css';

export const UsesLayout: React.FC = () => {
  return (
    <div className="main-content" style={{ marginTop: '30px' }}>
      <section className="uses-page-section">
        <SectionTitle>Uses & Tech Setup</SectionTitle>
        <p className="uses-page-intro">
          Here is a complete inventory of the software, AI development tools, frameworks, and hardware gear I use for building software and researching AI security.
        </p>

        <div className="uses-categories">
          {usesData.map((cat, idx) => (
            <div key={idx} className="uses-category-block">
              <h3 className="uses-category-title">{cat.category}</h3>
              <div className="uses-items-list">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="uses-item-card">
                    <span className="uses-item-label">{item.label}</span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="uses-item-name link"
                      >
                        {item.name} ↗
                      </a>
                    ) : (
                      <span className="uses-item-name">{item.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UsesLayout;
