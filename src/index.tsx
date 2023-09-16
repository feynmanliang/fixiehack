import { ChatCompletion, UserMessage } from 'ai-jsx/core/completion';
import { AssistantMessage, ConversationHistory, SystemMessage, renderToConversation } from 'ai-jsx/core/conversation';

export default async (_: any, { render }: any) => {
  const conversation = await renderToConversation(<ConversationHistory />, render);

  const messages = (conversation[0].element.props.metadata?.messages || []).map((m:any) => {
    if (m.role == 'system') {
      return (
        <SystemMessage>
          {m.content}
        </SystemMessage>
      );
    } else if (m.role == 'assistant') {
      return (
        <AssistantMessage>
          {m.content}
        </AssistantMessage>
      );
    } else {
      return (
        <UserMessage>
          {m.content}
        </UserMessage>
      );
    }
  });
  console.log(messages);
  return (
    <ChatCompletion>
      {messages}
    </ChatCompletion>
  );
};
