// src/App.tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Make sure to remove "Blog" link from Navbar.tsx
import Home from './pages/Home';
import Team from './pages/Team';
import Research from './pages/Research';
// import Blog from './pages/Blog'; // REMOVED: Blog page is no longer used
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/research" element={<Research />} />
            {/* <Route path="/blog" element={<Blog />} /> REMOVED: Blog route */}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold">© BDS Lab @IISERB</p>
              <a
                href="https://dse.iiserb.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 transition-colors inline-block font-medium"
              >
                Department of Data Science and Engineering, IISER Bhopal
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}