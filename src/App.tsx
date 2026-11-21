import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import Navbar from './components/navbar/Navbar';
import ClickSpark from './components/ClickSpark';
import Loading from './components/loading/Loading';
import SignatureLoaderOverlay from './components/loading/SignatureLoaderOverlay';
import { HireMe, TEXT_TO_ANIMATE } from './core/hire-me';
import { USER } from './data';
import { useTheme } from 'next-themes';
import { useViewport } from '@/hooks/useViewport';
import './App.css';

const Home = lazy(() => import('./pages/home/Home'));
const ProjectsLayout = lazy(() => import('./pages/projects/ProjectsLayout'));
const UsesLayout = lazy(() => import('./pages/uses/UsesLayout'));
const ResumeLayout = lazy(() => import('./pages/resume/ResumeLayout'));
const BlogLayout = lazy(() => import('./pages/blogs/BlogLayout'));
const HowToPlanAProject = lazy(() => import('./pages/blogs/HowToPlanAProject'));
const PageNotFound = lazy(() => import('./pages/notFound/PageNotFound'));

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { isMobile } = useViewport();
  const dark = resolvedTheme === 'dark';

  // ── Pull-cord hint: scaled on mobile, aligned neatly next to cord ──
  const cordHintFontSize = isMobile ? 0.72 : 1.4; // rem (reduced ~50% total on mobile)
  const cordSvgWidth = isMobile ? 26 : 44; // reduced ~50% total on mobile
  const cordSvgHeight = isMobile ? 16 : 30; // reduced ~50% total on mobile

  return (
    <Router>
      {!hasEntered && <SignatureLoaderOverlay onEnter={() => setHasEntered(true)} />}
      <div
        className={`app-container ${!dark ? 'light-theme' : ''}`}
        style={
          {
            '--pullcord-right': isMobile ? '0px' : '2rem',
          } as React.CSSProperties
        }
      >
        <PullCord
          onPull={() => setTheme(dark ? 'light' : 'dark')}
          pulled={!dark}
          ariaLabel="Toggle theme"
        />
        <div
          className="pull-cord-hint"
          style={{
            top: isMobile ? 130 : 135,
            right: isMobile
              ? 'calc(var(--pullcord-right, 0px) + 38px)'
              : 'calc(var(--pullcord-right, 2rem) + 42px)',
            opacity: 0.9,
          }}
        >
          <span
            style={{
              fontSize: `${cordHintFontSize}rem`,
              letterSpacing: '-0.2px',
              whiteSpace: 'nowrap',
            }}
          >
            pull the cord!
          </span>
          <svg
            width={cordSvgWidth}
            height={cordSvgHeight}
            viewBox="0 0 60 40"
            fill="none"
            stroke="currentColor"
            strokeWidth={isMobile ? 2 : 3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 5 32 Q 30 35, 52 14" />
            <path d="M 38 12 L 54 13 L 48 26" />
          </svg>
        </div>
        <Navbar />
        <ClickSpark sparkColor={dark ? '#ffffff' : '#000000'} sparkSize={10} sparkRadius={15}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<ProjectsLayout />} />
              <Route path="/uses" element={<UsesLayout />} />
              <Route path="/resume" element={<ResumeLayout />} />
              <Route path="/blogs" element={<BlogLayout />} />
              <Route path="/blogs/how-to-plan-a-project" element={<HowToPlanAProject />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ClickSpark>
        <HireMe text={TEXT_TO_ANIMATE} avatarSrc={USER.avatar} />
      </div>
    </Router>
  );
};

export default App;
