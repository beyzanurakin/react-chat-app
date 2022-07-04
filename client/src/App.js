import io from 'socket.io-client'
import React, { useState } from 'react'
import Chat from './components/Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }
  return (
    <div className='App'>
      {!showChat && (
        <div className='joinChatContainer'>
          <input
            type='text'
            placeholder='usernname'
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type='text'
            placeholder='room'
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>JOIN</button>
        </div>
      )}
      {showChat && <Chat socket={socket} userName={userName} room={room} />}
    </div>
  )
}

export default App
