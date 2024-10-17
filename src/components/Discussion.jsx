import React, { useState } from 'react'
    import '../styles/Discussion.css'

    function Discussion() {
      const [activeTab, setActiveTab] = useState('general')
      const [messages, setMessages] = useState({
        general: [],
        recoveryTips: [],
        faqs: [],
        goodResources: [],
        vent: []
      })
      const [newMessage, setNewMessage] = useState('')

      const handleSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
          setMessages({
            ...messages,
            [activeTab]: [
              ...messages[activeTab],
              { id: Date.now(), text: newMessage, likes: 0, author: 'User' }
            ]
          })
          setNewMessage('')
        }
      }

      const handleLike = (id) => {
        setMessages({
          ...messages,
          [activeTab]: messages[activeTab].map(msg =>
            msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
          )
        })
      }

      const tabs = [
        { id: 'general', name: 'General Discussion' },
        { id: 'recoveryTips', name: 'Recovery Tips' },
        { id: 'faqs', name: 'FAQs' },
        { id: 'goodResources', name: 'Good Resources' },
        { id: 'vent', name: 'I need to vent' }
      ]

      return (
        <div className="discussion-page">
          <h2>Discussion</h2>
          <div className="discussion-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="message-list">
            {messages[activeTab].map(message => (
              <div key={message.id} className="message">
                <p><strong>{message.author}:</strong> {message.text}</p>
                <button onClick={() => handleLike(message.id)} className="like-button">
                  👍 {message.likes}
                </button>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type your message for ${tabs.find(tab => tab.id === activeTab).name}...`}
              className="message-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      )
    }

    export default Discussion