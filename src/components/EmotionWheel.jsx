import React, { useState } from 'react'
    import '../styles/EmotionWheel.css'

    function EmotionWheel({ onSelectEmotion }) {
      const [selectedEmotion, setSelectedEmotion] = useState(null)

      const innerEmotions = [
        'Happy', 'Surprised', 'Sad', 'Bad', 'Fearful', 'Angry', 'Disgusted'
      ]

      const outerEmotions = [
        'Joyful', 'Excited', 'Optimistic', 'Proud', 'Peaceful', 'Powerful', 'Accepted',
        'Interested', 'Amazed', 'Confused', 'Startled',
        'Lonely', 'Guilty', 'Despair', 'Hurt',
        'Bored', 'Busy', 'Stressed', 'Tired',
        'Anxious', 'Insecure', 'Weak', 'Rejected',
        'Frustrated', 'Distant', 'Critical', 'Let down',
        'Disappointed', 'Awful', 'Repelled'
      ]

      const handleEmotionClick = (emotion) => {
        setSelectedEmotion(emotion)
        onSelectEmotion(emotion)
      }

      return (
        <div className="emotion-wheel">
          <h3>How are you feeling?</h3>
          <div className="wheel">
            <div className="inner-wheel">
              {innerEmotions.map((emotion, index) => (
                <button
                  key={`inner-${index}`}
                  className={`emotion inner ${selectedEmotion === emotion ? 'selected' : ''}`}
                  style={{ '--rotation': `${index * (360 / innerEmotions.length)}deg` }}
                  onClick={() => handleEmotionClick(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
            <div className="outer-wheel">
              {outerEmotions.map((emotion, index) => (
                <button
                  key={`outer-${index}`}
                  className={`emotion outer ${selectedEmotion === emotion ? 'selected' : ''}`}
                  style={{ '--rotation': `${index * (360 / outerEmotions.length)}deg` }}
                  onClick={() => handleEmotionClick(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
          {selectedEmotion && (
            <p>You selected: {selectedEmotion}</p>
          )}
        </div>
      )
    }

    export default EmotionWheel