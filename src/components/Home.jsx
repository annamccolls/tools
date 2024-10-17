import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <div className="forest-background"></div>
      <div className="content">
        <h1>Spiral</h1>
        <div className="bubbles">
          <Link to="/food" className="bubble">Food Log</Link>
          <Link to="/mood" className="bubble">Mood Log</Link>
          <Link to="/help-binge" className="bubble">Help, I need support</Link>
        </div>
      </div>
    </div>
  )
}

export default Home