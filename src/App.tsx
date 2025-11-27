
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { Home } from './pages/Home';
import { Vocabulary } from './pages/Vocabulary';
import { Settings } from './pages/Settings';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Layout wrapper to conditionally show Header/Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // We don't show the main header/footer on the immersive Vocabulary page or Settings page
  // because they have their own specific headers.
  const showMainLayout = location.pathname === '/';

  return (
    <>
      {showMainLayout && <Header />}
      {children}
      {showMainLayout && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-800">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/words" element={<Vocabulary />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster position="top-center" />
      </Router>
    </div>
  );
}

