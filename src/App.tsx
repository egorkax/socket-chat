import React, {useEffect, useState} from 'react';
import './App.css';
import io from "socket.io-client";


const portD = 'https://samurai-chat-back.herokuapp.com'
const port = 'http://localhost:3007'
let socket = io(portD)
console.log(socket)

function App() {
    const [messages, setMessages] = useState<Array<any>>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        debugger

        socket.on('init-messages-published', (messages: any) => {
            debugger
            setMessages(messages)
        })
        socket.on("new-message-sent", (message: any) => {
            setMessages((prevState) => [...prevState, message])
        })

    }, [])
    const onClickHandler = () => {
        socket.emit('client-message-sent', message)
        setMessage('')
    }

    return (
        <div className="App">
            <div className={'blockMess'} style={{overflowY: 'auto'}}>
                <div>
                    {messages.map((e, index) => {
                        return <div key={index}>
                            <b>{e.user.name}:</b>{e.message}
                            <hr/>
                        </div>
                    })}
                </div>
                <div className={'blockSend'}>
                    <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
                    <button onClick={onClickHandler}>send
                    </button>
                </div>
            </div>

        </div>
    );
}

export default App;
