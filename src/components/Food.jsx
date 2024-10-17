import React, { useState } from 'react'
import '../styles/Food.css'
import EmotionWheel from './EmotionWheel'

function Food() {
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [foodEaten, setFoodEaten] = useState('')
  const [isBinge, setIsBinge] = useState(null)
  const [urgeIntensity, setUrgeIntensity] = useState(0)

  const mealTimes = [
    "Pre-breakfast",
    "Breakfast",
    "Morning Snack",
    "Lunch",
    "Afternoon Snack",
    "Dinner",
    "Late Night Snack"
  ]

  const handleMealClick = (meal) => {
    setSelectedMeal(selectedMeal === meal ? null : meal)
    setFoodEaten('')
    setIsBinge(null)
    setUrgeIntensity(0)
  }

  const handleBingeClick = (value) => {
    setIsBinge(value)
    if (value) {
      // Log binge data when "Yes" is clicked
      const newBingeData = {
        type: 'binge',
        timestamp: new Date().toISOString(),
        meal: selectedMeal
      }
      const storedBingeData = JSON.parse(localStorage.getItem('bingeData')) || []
      const updatedBingeData = [...storedBingeData, newBingeData]
      localStorage.setItem('bingeData', JSON.stringify(updatedBingeData))
    }
  }

  const handleUrgeIntensityChange = (e) => {
    const intensity = parseInt(e.target.value)
    setUrgeIntensity(intensity)
    // Log urge data
    const newUrgeData = {
      type: 'urge',
      timestamp: new Date().toISOString(),
      intensity: intensity
    }
    const storedUrgeData = JSON.parse(localStorage.getItem('urgeData')) || []
    const updatedUrgeData = [...storedUrgeData, newUrgeData]
    localStorage.setItem('urgeData', JSON.stringify(updatedUrgeData))
  }

  return (
    <div className="food-page">
      <h2>Food Log</h2>
      <div className="meal-buttons">
        {mealTimes.map((meal, index) => (
          <div key={index} className="meal-section">
            <button
              className={`meal-button ${selectedMeal === meal ? 'active' : ''}`}
              onClick={() => handleMealClick(meal)}
            >
              {meal}
            </button>
            {selectedMeal === meal && (
              <div className="food-input">
                <label htmlFor={`food-eaten-${index}`}>Food eaten:</label>
                <textarea
                  id={`food-eaten-${index}`}
                  value={foodEaten}
                  onChange={(e) => setFoodEaten(e.target.value)}
                  placeholder="Enter food eaten..."
                />
                <div className="binge-question">
                  <span>Binge?</span>
                  <button
                    className={`binge-button ${isBinge === true ? 'active' : ''}`}
                    onClick={() => handleBingeClick(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`binge-button ${isBinge === false ? 'active' : ''}`}
                    onClick={() => handleBingeClick(false)}
                  >
                    No
                  </button>
                </div>
                <div className="urge-intensity">
                  <label htmlFor="urge-intensity">Urge Intensity (0-10):</label>
                  <input
                    type="range"
                    id="urge-intensity"
                    min="0"
                    max="10"
                    value={urgeIntensity}
                    onChange={handleUrgeIntensityChange}
                  />
                  <span>{urgeIntensity}</span>
                </div>
                <EmotionWheel />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Food