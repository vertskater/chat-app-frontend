import {useState, useEffect} from "react";
import {io , Socket} from 'socket.io-client';

import styles from '../styles/Chat.ts';

interface ServerToClientEvents {
    receiveMessage: (message: Message) => void;
}

interface ClientToServerEvents {
    sendMessage: (data: { room: string; content: string; username: string }) => void;
    joinRoom: (room: string) => void;
}

interface Message {
    id?: number,
    uuid?: string,
    userId?: number | string,
    room: string,
    content: string,
    user?: {username: string},
    username?: string
}

export default function Chat()  {
    const [jwt, setJwt] = useState('');
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
    const [messages, setMessages] = useState<Message[]>([])
    const [room, setRoom] = useState('general');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<Error | null>(null)

    useEffect((): (() => void) | undefined => {
        const token = localStorage.getItem('jwt-token');
        if(!token) {
            //TODO: change to Client side Routing
            alert('please login first');
            return;
        }
        setJwt(token);
        const userId = localStorage.getItem('userId');
        if(userId) setUsername(username || 'temp user');
        setMessages([]);
        (async () => {
            try {
                const response = await fetch(`http://localhost:3000/chat/messages?room=${room}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                })
                const data = await response.json();
                setMessages(data.messages)
            } catch (error) {
                setError(new Error((error as Error).message));
            }
        })();

        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000/', {
            auth: {token},
            withCredentials: true
        })
        newSocket.on('receiveMessage', (newMessage)=> {
            setMessages((prevMsg): Message[] => [...prevMsg, newMessage])
        });
        newSocket.emit("joinRoom", room);

        setSocket(newSocket);
        return () => newSocket.close();
    }, [room, username]);

    const handleSendMessage = async () => {
        if(message.trim() && socket) {
            const token = localStorage.getItem('jwt-token');
            const user = localStorage.getItem('userId');

            const newMessage = {content: message, room, userId: user!}
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            setUsername(user || '');
            const options = {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content: message, room})
            }
            try {
              await fetch('http://localhost:3000/chat/messages', options);
              socket.emit('sendMessage', {room, content: message, username: username});
              setMessage("");
            }catch (err) {
                setError(new Error((err as Error).message))
            }
        }
    }

    return (
        <div style={styles.chatContainer}>
            <div className="error">
                {error?.message}
            </div>
            <h2>Chat Room: {room}</h2>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>
                        <strong>{msg.user?.username}: </strong> {msg.content}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                />
                <button onClick={handleSendMessage} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
}