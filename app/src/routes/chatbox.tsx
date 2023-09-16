import {Message} from './types';
import MessageUI from './message';
import { createSignal } from 'solid-js';

type ChatboxProps = {
  messages: Message[],
  sendMessage: (m: string) => void
};

export default function Chatbox(props: ChatboxProps) {
  const [text, setText] = createSignal("");

  return (
    <div>    
      <div className="messages-box">    
        {props.messages.map(m => <MessageUI message={m} />)}
      </div>    
      <input
        className="chat-input"
        placeholder="send message"
        onInput={e => {
          setText(e.target.value);
        }}
      />
      <button className="chat-submit" onClick={() => {
        props.sendMessage(text());
        setText("");
      }}>send</button>
    </div>
  );
}
