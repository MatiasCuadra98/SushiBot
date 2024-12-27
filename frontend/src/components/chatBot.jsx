import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);

    const sendMessage = async () => {
        if (!input) return;

        // Agregar mensaje del usuario al estado
        dispatch(addMessage({ sender: 'user', text: input }));

        try {
            const response = await axios.post('http://localhost:3000/chat', { message: input });

            if (response.headers['content-type'] === 'application/pdf') {
                dispatch(addMessage({
                    sender: 'bot',
                    text: 'Aquí tienes el menú: descarga el PDF.',
                }));
            } else {
                dispatch(addMessage({
                    sender: 'bot',
                    text: response.data.reply,
                }));
            }
        } catch (error) {
            dispatch(addMessage({
                sender: 'bot',
                text: 'Hubo un error, intenta nuevamente.',
                error: console.log(error)
            }));
        }

        setInput('');
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        {msg.text}
                    </p>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatBot;
