import React from 'react';
import { HiDocumentDownload } from 'react-icons/hi';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Footer from '../../components/footer/Footer';
import { getAssetUrl } from '../../data/images';

const RESUME_URL = getAssetUrl('/resume/resume.pdf');

export const ResumeLayout: React.FC = () => {
  return (
    <div className="main-content" style={{ marginTop: '30px' }}>
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <SectionTitle>Resume — Dhiraj Bhavikatti</SectionTitle>
          <a
            href={RESUME_URL}
            download="Dhiraj_Bhavikatti.pdf"
            className="composite-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <HiDocumentDownload size={18} />
            <span>Download PDF</span>
          </a>
        </div>

        <div style={{ width: '100%', height: '800px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #444' }}>
          <iframe
            src={RESUME_URL}
            title="Dhiraj Bhavikatti Resume"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ResumeLayout;
