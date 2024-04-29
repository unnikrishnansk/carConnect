import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { Picker } from 'emoji-mart';
// import "emoji-mart/dist/emoji-mart.css";
// import socketIO from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import Sidebar from './Sidebar';
// const socket = socketIO.connect('http://localhost:5000');

const Chat = () => {

  const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth);
    console.log("userInfo", userInfo)
    const socket = io('http://localhost:5000');

    const handleMessage = (e) => {
      e.preventDefault();
      console.log('Message:', message);
      setMessage('');
      socket.emit('chat-message', { msg: message, userInfo: userInfo });
    };

    const handleEmojiSelect = (event, emojiObject) => {
      console.log(emojiObject);
      console.log(event);
      setMessage(message + event.emoji); // Append selected emoji to message
  };

      useEffect(() => {
        socket.on('chat-message', (payload) => {
            console.log("payload", payload)
            setChat([...chat, payload]);
        });
    });

    const handleFileChange = (e) => {
      console.log(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    };

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
    <div className='d-flex align-items-stretch'>
    <Sidebar />
    <div className='w-100 bg-dark justify-content-center align-items-center p-2 rounded chatarea-container'>
        {/* <div className='chat-header'>chat header</div> */}
        <div className='chat-area'>
        <ul id="messages">
                    {chat.map((payload, index) => {
                        const isSentByCurrentUser = payload.sender.name === userInfo.name;
                        const messageClass = isSentByCurrentUser ? 'sent-message' : 'received-message';

                        return (
                          // <div className='messagediv'>
                            <p
                                key={index}
                                className={`message-container ${messageClass}`}
                            >
                                {payload.msg}
                            </p>
                            // </div>
                        );
                    })}


                </ul>
        </div>
        <div className='chat-input'>
        <form className="form" onSubmit={handleMessage}>
        {/* <div className="file-input-container">
              {/* <label htmlFor="file-upload"> */}
                {/* <FontAwesomeIcon icon={faImage} className="fa-lg me-3 fa-fw" /> */}
              {/* </label> */}
              {/* <input type="file" id="file-upload" onChange={handleFileChange} /> */}
              {/* <label htmlFor="video-upload"> */}
                {/* <FontAwesomeIcon icon={faVideo} className="fa-lg me-3 fa-fw" /> */}
              {/* </label> */}
              {/* <input type="file" id="video-upload" onChange={handleFileChange} accept="video/*" />
            </div>  */}
            <input 
            id="input"
            placeholder='type a message' 
            className='search-box' 
            type="text" 
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            {/* Button to toggle emoji picker */}
            <button type='button' className='border-0' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <FontAwesomeIcon icon={faSmile} className="fa-lg me-3 fa-fw" />
                    </button>
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    )}
                    {/* <EmojiPicker /> */}
            <button type='submit' className='border-0'><FontAwesomeIcon icon={faPaperPlane} className="fa-lg me-3 fa-fw" /></button>
        </form>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default Chat;