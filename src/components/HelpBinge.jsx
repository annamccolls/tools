import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HelpBinge.css';

function HelpBinge() {
  const [urgeIntensity, setUrgeIntensity] = useState(5);
  const navigate = useNavigate();

  const handleRecordUrge = () => {
    const newUrgeData = {
      type: 'urge',
      timestamp: new Date().toISOString(),
      intensity: urgeIntensity
    };
    const storedUrgeData = JSON.parse(localStorage.getItem('urgeData')) || [];
    const updatedUrgeData = [...storedUrgeData, newUrgeData];
    localStorage.setItem('urgeData', JSON.stringify(updatedUrgeData));
    
    // Navigate to the Tracker page after recording the urge
    navigate('/tracker');
  };

  return (
    <div className="help-binge-page">
      <h2>Help, I'm About to Binge</h2>
      <button className="record-urge-btn" onClick={handleRecordUrge}>
        Record my Urge
      </button>
      <div className="urge-intensity">
        <label htmlFor="urge-intensity">Urge Intensity (0-10):</label>
        <input
          type="range"
          id="urge-intensity"
          min="0"
          max="10"
          value={urgeIntensity}
          onChange={(e) => setUrgeIntensity(parseInt(e.target.value))}
        />
        <span>{urgeIntensity}</span>
      </div>
      <Link to="/tools" className="tools-button">Tools</Link>
      <div className="helpline-info">
        <h3>Need immediate support?</h3>
        <p>Contact the National Alliance for Eating Disorders Helpline:</p>
        <p className="helpline-number">1-800-931-2237</p>
        <p>Available Monday-Thursday from 11am to 9pm ET, and Friday from 11am to 5pm ET.</p>
      </div>
    </div>
  );
}

export default HelpBinge;