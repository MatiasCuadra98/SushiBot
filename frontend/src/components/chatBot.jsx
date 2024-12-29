import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import axios from 'axios';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);

    const API_URL = "http://localhost:3000" ;

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
    
        dispatch(addMessage({ sender: 'user', text: trimmedInput }));
    
        try {
            const response = await axios.post(`${API_URL}/api/chat`, { message: trimmedInput });
    
            if (response?.data?.reply) {
                dispatch(addMessage({
                    sender: 'bot',
                    text: response.data.reply,
                }));
    
                // Verificar si hay un enlace PDF en la respuesta
                if (response.data.pdfUrl) {
                    dispatch(addMessage({
                        sender: 'bot',
                        text: (
                            <a
                                href={response.data.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Descarga el PDF
                            </a>
                        ),
                    }));
                }
            } else {
                dispatch(addMessage({
                    sender: 'bot',
                    text: 'Lo siento, no pude entender tu solicitud. Por favor, intenta nuevamente.',
                }));
            }
        } catch (error) {
            dispatch(addMessage({
                sender: 'bot',
                text: 'Hubo un error procesando tu mensaje. Intenta nuevamente más tarde.',
            }));
            console.error('Error al enviar el mensaje:', error);
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
