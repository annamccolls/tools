import React, { useState } from 'react'
import '../styles/Tools.css'

function Tools() {
  const [selectedTool, setSelectedTool] = useState(null)

  const handleExampleClick = (tool) => {
    if (tool === 'thoughtRecord') {
      window.open('/Thought_Record_Copy.pdf', '_blank')
    }
    // Add similar conditions for other example PDFs when you have them
  }

  const renderOptions = (tool) => {
    let options = []
    switch (tool) {
      case 'thoughtRecord':
        options = ['Example Thought Record', 'Previous Thought Records', 'New Thought Record']
        break
      case 'behaviorChain':
        options = ['Example Behavior Chain', 'Previous Behavior Chains', 'New Behavior Chain']
        break
      case 'radicalAcceptance':
        options = ['Example Radical Acceptance', 'Previous Documents', 'New Radical Acceptance']
        break
      default:
        return null
    }

    return (
      <div className="tool-options">
        {options.map((option, index) => (
          <button 
            key={index} 
            className={`option-button ${option.startsWith('Example') ? 'example-button' : ''}`}
            onClick={() => option.startsWith('Example') ? handleExampleClick(tool) : null}
          >
            {option}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="tools-page">
      <h2>Tools</h2>
      <p>Select a tool to help manage urges and support your recovery:</p>
      
      <div className="tools-grid">
        <div className="tool-item">
          <button 
            className="tool-button"
            onClick={() => setSelectedTool('thoughtRecord')}
          >
            Thought Record
          </button>
          <p className="tool-caption">Best used when feeling a shift in your emotions</p>
          {selectedTool === 'thoughtRecord' && renderOptions('thoughtRecord')}
        </div>
        
        <div className="tool-item">
          <button 
            className="tool-button"
            onClick={() => setSelectedTool('behaviorChain')}
          >
            Behavior Chain
          </button>
          <p className="tool-caption">When you feel an urge but you don't know where it came from</p>
          {selectedTool === 'behaviorChain' && renderOptions('behaviorChain')}
        </div>
        
        <div className="tool-item">
          <button 
            className="tool-button"
            onClick={() => setSelectedTool('radicalAcceptance')}
          >
            Radical Acceptance
          </button>
          <p className="tool-caption">I'm having trouble moving on</p>
          {selectedTool === 'radicalAcceptance' && renderOptions('radicalAcceptance')}
        </div>
      </div>
    </div>
  )
}

export default Tools