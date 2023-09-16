import { Message } from '~/types';

type MessageProps = {
  message: Message
};
export default function MessageUI({message}: MessageProps) {
  const location = message.role === 'user' ? 'chat-start' : 'chat-end';
  return (
    <div className={`chat ${location}`}>
      <div className="chat-bubble">{message.content}</div>
    </div>
  );
}
//
//<div className="chat chat-start">
//  <div className="chat-image avatar">
//    <div className="w-10 rounded-full">
//      <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//    </div>
//  </div>
//  <div className="chat-header">
//    Obi-Wan Kenobi
//    <time className="text-xs opacity-50">12:45</time>
//  </div>
//  <div className="chat-bubble">You were the Chosen One!</div>
//  <div className="chat-footer opacity-50">
//    Delivered
//  </div>
//</div>
