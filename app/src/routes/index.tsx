import Chatbox from './chatbox';
import { Message } from './types';
import { createSignal } from 'solid-js';
import Recs from './recommendations';
import './main.css'

const rs = [
  {
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 1,
  },
  {
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 2,
  },
  {
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 3,
  },
];

const ms = [
  { from: 'sender', content: "lkj;laskdjf"},
  { from: 'receiver', content: "lkj;laskdjf"},
];

export default function Home() {
  const [messages, setMessages] = createSignal(ms);

  const sendMessage = (t: string) => {
    // TODO send to chatbot
    const newMessages = [...messages(), { from: 'sender', content: t }];
    setMessages(newMessages);
  };

  return (
    <main class="flex flex-row">
      <Chatbox
        messages={messages() as Message[]}
        sendMessage={sendMessage}
      />
      <Recs recs={rs} />
    </main>
  );
}
