import Chatbox from './chatbox';
import { Rec } from 'recommendations';
import { Message } from './types';
import { createSignal } from 'solid-js';
import Recs from './recommendations';
import './main.css'

const rs = [
  {
    logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/erj8ala3t51wlfs40wjr',
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 1,
  },
  {
    logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/erj8ala3t51wlfs40wjr',
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 2,
  },
  {
    logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/erj8ala3t51wlfs40wjr',
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

  const clearRec = (r: Rec) => {
    console.log(r);
  };

  return (
    <main class="flex flex-row">
      <Chatbox
        messages={messages() as Message[]}
        sendMessage={sendMessage}
      />
      <Recs recs={rs} onClear={clearRec}/>
    </main>
  );
}
