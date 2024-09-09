import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        'https://messaging-app-server-pi.vercel.app/messages'
      )
      setMessages(res.data)
    }
    fetchMessages()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(
      'https://messaging-app-server-pi.vercel.app/messages',
      {
        username,
        content,
      }
    )
    setMessages([...messages, res.data])
    setContent('')
  }

  return (
    <div>
      <h1>Messaging App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
