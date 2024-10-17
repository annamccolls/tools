import React, { useState, useEffect } from 'react'
import EmotionWheel from './EmotionWheel'
import '../styles/Mood.css'

function Mood() {
  const [logs, setLogs] = useState([])
  const [place, setPlace] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState(null)
  const [intensity, setIntensity] = useState(5)

  useEffect(() => {
    // Load mood data from localStorage
    const storedMoodData = JSON.parse(localStorage.getItem('moodData')) || [];
    setLogs(storedMoodData);
  }, []);

  const logMood = () => {
    const newLog = {
      type: 'mood',
      timestamp: new Date().toISOString(),
      place: place,
      emotion: selectedEmotion,
      intensity: intensity
    }
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs)
    localStorage.setItem('moodData', JSON.stringify(updatedLogs));
    setPlace('')
    setSelectedEmotion(null)
    setIntensity(5)
  }

  return (
    <div className="mood-page">
      <h2>Mood Log</h2>
      <div className="place-input">
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter location..."
        />
      </div>
      <EmotionWheel onSelectEmotion={setSelectedEmotion} />
      <div className="intensity-input">
        <label htmlFor="intensity">Intensity (0-10):</label>
        <input
          type="range"
          id="intensity"
          min="0"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
        />
        <span>{intensity}</span>
      </div>
      <button className="log-time-btn" onClick={logMood}>Log Mood</button>
      <div className="mood-chart">
        <h3>Today's Mood Log</h3>
        {logs.length === 0 ? (
          <p>No moods logged today</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                <span>{log.place}</span>
                <span>{log.emotion}</span>
                <span>Intensity: {log.intensity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Mood