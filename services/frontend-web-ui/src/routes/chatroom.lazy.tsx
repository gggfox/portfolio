import { Button, Group, Stack, TextInput } from '@mantine/core'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

interface MessageInterface {
  message: string
}
function Message({message}: MessageInterface) {
  return <div>
  {message}
</div> 
}

interface ChatProps {
  messages: string[]
}

function Chat({messages}: ChatProps) {
  return <Stack h='90%'>
  {messages.map((message, index) => <Message key={index} message={message}/>)}
</Stack>
}

interface UserMessageControlsProps {
  messages: string[]
  setMessages: React.Dispatch<React.SetStateAction<string[]>>
  ws: null | WebSocket
}

function UserMessageControls({ws}: UserMessageControlsProps) {
  const [message, setMessage] = useState<string>('')

 
    const sendMessage = () => {
      console.log('send message', ws, ws?.readyState, WebSocket.OPEN)
   

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        setMessage('');
      }else {
        console.error('WebSocket is not open');
      }
    };


  return     <Group justify='center' w='100%'>
  <TextInput w='80%' value={message} onChange={(event) => setMessage(event.currentTarget.value)} />
  <Button 
    w='15%' 
    onClick={() => {
       sendMessage()
    }} 
    disabled={message.trim() === ''}
  >
    Send
  </Button>
</Group>
}

function ChatRoom() {
  const [messages, setMessages] = useState(['wow', 'great', 'lets do it', 'bring the pain'])
  const ws  = useRef<null | WebSocket>(null);

  useEffect(() => {
    let reconnectInterval: NodeJS.Timeout | string | number | undefined;
    const connectWebSocket = () => {
    // Establishing a WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080');
    console.log(ws)

    // Event listener for connection open
    ws.current.onopen = () => {
      clearInterval(reconnectInterval);
      console.log('WebSocket connection established.');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    }

    // Event listener for incoming messages
    ws.current.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };



    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
      reconnectInterval = setInterval(connectWebSocket, 3000);
    };

  }
  connectWebSocket();


    // Cleanup function to close the socket on component unmount
    return () => {
      console.log('Cleaning up WebSocket connection');
    clearInterval(reconnectInterval); // Clear the interval when the component unmounts
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }
    };
  }, []);
  

  return <Stack h='90svh' m='md'>
      <Chat messages={messages}/>
      <UserMessageControls setMessages={setMessages} messages={messages} ws={ws.current}/>
    </Stack>
}

export const Route = createLazyFileRoute('/chatroom')({ component: ChatRoom })