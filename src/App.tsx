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
  const [dark, setDark] = useState<boolean>(true);

  return (
    <Router>
      {!hasEntered && <SignatureLoaderOverlay onEnter={() => setHasEntered(true)} />}
      <div className={`app-container ${!dark ? 'light-theme' : ''}`}>
        <PullCord
          onPull={() => setDark((d) => !d)}
          pulled={!dark}
          ariaLabel="Toggle theme"
        />
        <div className="pull-cord-hint">
          <span>pull the cord!</span>
          <svg
            width="44"
            height="30"
            viewBox="0 0 60 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
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
