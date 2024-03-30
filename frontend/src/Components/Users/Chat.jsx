import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:5000');

const Chat = () => {

    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     socket.on('messageResponse', (data) => setMessages([...messages, data]));
    //   }, [socket, messages]);

    //   console.log(messages);

    // const handleSendMessage = (e) => {
    //     e.preventDefault();
    //     if (message.trim() && localStorage.getItem('userName')) {
    //       socket.emit('message', {
    //         text: message,
    //         // name: localStorage.getItem('userName'),
    //         id: `${socket.id}${Math.random()}`,
    //         socketID: socket.id,
    //       });
    //     }
    //     console.log(message);
    //     setMessage('');
    //   };

  return (
    <>
    <Navbar />
    <div className='bg-dark justify-content-center align-items-center p-2 rounded chatarea-container'>
        <div className='chat-header'>chat header</div>
        <div className='chat-area'>chat area</div>
        <div className='chat-input'>
        {/* <form className="form" onSubmit={handleSendMessage}> */}
            <input 
            placeholder='type a message' 
            className='search-box' 
            type="text" 
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            />
            <button type='submit' className='border-0'><FontAwesomeIcon icon={faPaperPlane} className="fa-lg me-3 fa-fw" /></button>
        {/* </form> */}
        </div>
        
    </div>
    </>
  )
}

export default Chat;