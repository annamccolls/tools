import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home'
import Food from './components/Food'
import Mood from './components/Mood'
import Tools from './components/Tools'
import Articles from './components/Articles'
import Discussion from './components/Discussion'
import Tracker from './components/Tracker'
import Nutrition from './components/Nutrition'
import HelpBinge from './components/HelpBinge'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/food">Food</Link></li>
            <li><Link to="/mood">Mood</Link></li>
            <li><Link to="/tools">Tools</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/discussion">Discussion</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/help-binge" element={<HelpBinge />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App