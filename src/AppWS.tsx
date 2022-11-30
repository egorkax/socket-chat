import React, {useEffect, useRef, useState} from 'react';
import './App.css';


type messagesWebSocketType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export function AppWS() {
    let messagesBlockRef = useRef()
    const [ws, setWs] = useState(null)
    const [messages, setMessages] = useState<Array<messagesWebSocketType>>([])
    const [message, setMessage] = useState('')
    if (ws) {
        // @ts-ignore
        ws.onmessage = (messEvent: MessageEvent) => {
            let messagesServer = JSON.parse(messEvent.data)
            setMessages([...messages, ...messagesServer])
            // @ts-ignore
            messagesBlockRef.scrollTo(0, messagesBlockRef.current.scrollHeight)

        }
    }
    useEffect(() => {
        let localWs = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        // @ts-ignore
        setWs(localWs)
    }, [])


    const onClickHandler = () => {
        if (message) {
            // @ts-ignore
            ws.send(message)
            setMessage('')
        }
    }
    const messagesHookMap = messages.map((e, index) => {
        return <div key={index}>
            <img src={e.photo} style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
            <b>{e.userName}:</b>{e.message}
            <hr/>
        </div>
    })

    return (
        <div className="App">
            <div className={'blockMess'} style={{overflowY: 'scroll'}}>
                <div
                    // @ts-ignore
                    ref={messagesBlockRef}
                >
                    {messagesHookMap}
                </div>
                <div className={'blockSend'}>
                    <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
                    <button onClick={onClickHandler}>send</button>
                </div>
            </div>

        </div>
    );
}


export function AppWSTestUI() {
    let messagesBlockRef = useRef()
    const [messages, setMessages] = useState<Array<messagesWebSocketType>>([])
    const [messageInput, setMessageInput] = useState('')

    const onClickHandler = () => {
        let newItem = {
            message: messageInput,
            photo: '',
            userId: 123,
            userName: 'test'
        }
        setMessages([...messages, newItem])
        setMessageInput('')
        // @ts-ignore
        messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);

    }
    return (
        <div className="App">
            <div className={'blockMess'} style={{overflowY: 'auto'}}>
                <div
                    // @ts-ignore
                    ref={messagesBlockRef}
                >
                    {messages.map((e, index) => {
                        return <div key={index}>
                            <img src={e.photo} style={{width: '30px', height: '30px', borderRadius: '50%'}}/>
                            <b>{e.userName}:</b>{e.message}
                            <hr/>
                        </div>
                    })}
                </div>
                <div className={'blockSend'}>
                    <textarea value={messageInput} onChange={(e) => setMessageInput(e.currentTarget.value)}/>
                    <button
                        onClick={onClickHandler}>send
                    </button>
                </div>
            </div>

        </div>
    )
        ;
}



