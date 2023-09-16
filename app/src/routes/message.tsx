import { Message } from './types';

type MessageProps = {
  message: Message
};
export default function MessageUI({message}: MessageProps) {
  const location = message.from === 'sender' ? 'left' : 'right';
  return (
    <span className={`message ${location}-message`}>
      {message.content}
    </span>
  );
}
