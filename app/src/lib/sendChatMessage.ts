import {Message} from '~/types';

//-d '{ "message": {"text": ""}, "metadata": {"messages": [{"role": "system", "content": "system message"}, {"role": "user", "content": "user message"}, {"role": "assistant", "content": "assistant message"}, {"role": "user", "content": "second user message"}]}}' \

const TOKEN = import.meta.env.VITE_TOKEN;

export default function sendChatMessage(messages: Message[]) {
  const body = {
    messages,
  };
  return fetch(
    'https://api.fixie.ai/api/v1/agents/feynmanliang/fixie-sidekick-template/conversations',
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(body)
    }
  ).then(x => x.json())
}
