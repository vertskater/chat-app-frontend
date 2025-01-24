import {useState, useEffect, FormEvent, useRef} from "react";
import {io , Socket} from 'socket.io-client';
import Room from "./Room.tsx";

import styles from '../styles/Chat.ts';
import '../styles/Chat.css';

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
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
    const [messages, setMessages] = useState<Message[]>([])
    const [room, setRoom] = useState('general');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState<Error | null>(null)
    const msgEndRef= useRef<HTMLDivElement | null>(null)

    useEffect((): (() => void) | undefined => {
        const token = localStorage.getItem('jwt-token');
        if(!token) {
            //TODO: change to Client side Routing
            alert('please login first');
            return;
        }
        //setJwt(token);
        const username = localStorage.getItem('username');
        if(username) setUsername(username);
        setMessages([]);
        (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_FETCH_URL}/chat/messages?room=${room}`, {
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
            setUsername(newMessage?.user?.username ?? 'default user');
        });
        newSocket.emit("joinRoom", room);

        setSocket(newSocket);
        return () => newSocket.close();
    }, [room, username]);
    const scrollToBottom = () => {
        if(msgEndRef.current) {
            msgEndRef.current.scrollTop = msgEndRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if(message.trim() && socket) {
            const user = localStorage.getItem('userId');
            setUsername(user || '');
            try {
              socket.emit('sendMessage', {room, content: message, username: username});
              setMessage("");
            }catch (err) {
                setError(new Error((err as Error).message))
            }
        }
    }
    const createRoom = (e: FormEvent<HTMLFormElement>, room: string) => {
        e.preventDefault();
        setRoom(room);
    }
    return (
    <>
        <div style={styles.chatContainer}>
            <div className="error">
                {error?.message}
            </div>
            <h2>Chat Room: {room}</h2>
            <div style={({
                ...styles.messagesContainer,
                overflowY: "scroll",
            } as object)}
                 ref={msgEndRef}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message} className={msg.user?.username === username ? 'owner' : ''}>
                     <span style={styles.username}>{msg.user?.username}: </span> { msg.content}
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
        <Room createRoom={createRoom}/>
    </>
    );
}