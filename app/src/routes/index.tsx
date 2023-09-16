import Chatbox from './chatbox';
// import sendChatMessage from '~/lib/sendChatMessage';
import { askQuestionOrMakeInitialRecommendation } from '~/sidekick_client';
import { Message } from '~/types';
import { createSignal } from 'solid-js';
import Recs, {Rec} from './recommendations';
import './main.css'

const rs = [
  {
    logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/erj8ala3t51wlfs40wjr',
    summary: "aldskfjadlkfjsdlfj lsdfkj adlsfkj asdflkj  asdflkj",
    rank: 3,
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

export default function Home() {
  const [messages, setMessages] = createSignal([]);

  const sendMessage = (t: string) => {
    // TODO send to chatbot
    const newMessages = [...messages(), { role: 'user', content: t }];
    setMessages(newMessages);
    // sendChatMessage(newMessages)
    askQuestionOrMakeInitialRecommendation(newMessages)
    .then(x => {
        console.log(x);
      });
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
