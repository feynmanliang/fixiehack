import Chatbox from './chatbox';
// import sendChatMessage from '~/lib/sendChatMessage';
import { askQuestionOrMakeInitialRecommendation, refineList } from '~/sidekick_client';
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
  const [recs, setRecs] = createSignal([]);

  const sendMessage = async (t: string) => {
    const newMessages = [...messages(), { role: 'user', content: t }];
    setMessages(newMessages);
      // TODO 'refine'


    const products = (await import('~/data.json')).default;

    if (recs && recs().length) {
      const x = await refineList(newMessages, recs());
      const res = JSON.parse(x.data).map(d => {
        const product = products.find(x => x.id == d.id-1);
        return {
          name: product.name,
          // name: d.name,
          rank: d.rating,
          logo: product.Image,
          pros: d.Pros,
          cons: d.Cons,
        };
      })
      setRecs(res);
      const resp = {
        content: "Sure. Here are my revised recommendations.",
        role: 'assistant'
      };
      setMessages([...messages(), resp]);
    } else {
      askQuestionOrMakeInitialRecommendation(newMessages)
      .then(x => {
          console.log(x);
          switch (x.type) {
            case 'recs':
              const res = JSON.parse(x.data).map(d => {
                const product = products.find(x => x.id == d.id-1);
                return {
                  name: product.name,
                  // name: d.name,
                  rank: d.rating,
                  logo: product.Image,
                  pros: d.Pros,
                  cons: d.Cons,
                };
              })
              setRecs(res);
              const resp = {
                content: "Sure. Here are some of my recommendations.",
                role: 'assistant'
              };
              setMessages([...messages(), resp]);
              break;

            case 'error':
              alert(x.data);
              break;

            case 'clarification':
              const asstResponse = {
                content: x.data,
                role: 'assistant'
              };
              const msgWithAst = [...messages(), asstResponse];
              setMessages(msgWithAst);
              break;

            default:
              return;
          }

      });
    }
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
      <Recs recs={recs()} onClear={clearRec}/>
    </main>
  );
}
