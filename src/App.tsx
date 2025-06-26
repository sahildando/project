import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Constructors from './pages/Constructors';
import Standings from './pages/Standings';
import Calendar from './pages/Calendar';
import Tracks from './pages/Tracks';
import Compare from './pages/Compare';
import TechCenter from './pages/TechCenter';
import AIZone from './pages/AIZone';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/constructors" element={<Constructors />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/tech" element={<TechCenter />} />
            <Route path="/ai" element={<AIZone />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;