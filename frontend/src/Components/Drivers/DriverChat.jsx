import React, { useState, useEffect } from 'react'
import DriverNavbar from './DriverNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import io from 'socket.io-client';
import DriverSidebar from './DriverSidebar';
import './DriverChat.css';

const DriverChat = () => {

    // const { userInfo } = useSelector((state) => state.auth);
    // console.log("userInfo", userInfo);

    const { driverInfo } = useSelector((state) => state.driver);
    console.log("driverInfo", driverInfo);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const navigate = useNavigate();
    const socket = io('http://localhost:5000');

    const handleMessage = (e) => {
        e.preventDefault();
        console.log('Message:', message);
        setMessage('');
        socket.emit('chat-message', { msg: message, userInfo: driverInfo });
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
    
  return (
    <>
    <DriverNavbar />
    <div className='d-flex align-items-stretch'>
    <DriverSidebar />

    <div className='w-100 bg-dark justify-content-center align-items-center p-2 rounded chatarea-container'>
        {/* <div className='chat-header'>chat header</div> */}
        <div className='chat-area'>
        <ul id="messages">
                    {chat.map((payload, index) => {
                        const isSentByCurrentUser = payload.sender.name === driverInfo.name;
                        const messageClass = isSentByCurrentUser ? 'sent-message' : 'received-message';

                        return (
                            <p
                                key={index}
                                className={`message-container ${messageClass}`}
                            >
                                {payload.msg}
                            </p>
                        );
                    })}


                </ul>
        </div>
        <div className='chat-input'>
        <form className="form" onSubmit={handleMessage}>
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
            <button type='submit' className='border-0'><FontAwesomeIcon icon={faPaperPlane} className="fa-lg me-3 fa-fw" /></button>
        </form>
        </div>
        
    </div>
    </div>
    </>
    
  )
}

export default DriverChat;