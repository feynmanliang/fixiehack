import { AssistantMessage, ConversationHistory, renderToConversation } from 'ai-jsx/core/conversation';
import { FixieAPIContext } from 'ai-jsx/batteries/fixie';
import { OpenAIClient } from 'ai-jsx/lib/openai';

export default async (_: any, { render, getContext }: any) => {
  const { url: apiBaseUrl, authToken } = getContext(FixieAPIContext);

  const conversation = await renderToConversation(<ConversationHistory />, render);
  const metadata = conversation[0].element.props.metadata as any;

  const openai = new OpenAIClient({
    apiKey: authToken,
    baseURL: new URL('api/openai-proxy/v1', apiBaseUrl).toString(),
  })

  const response = await openai.chat.completions.create(metadata);
  console.log(JSON.stringify(response));

  return (
    <AssistantMessage>
      {JSON.stringify(response)}
    </AssistantMessage>
  );
};
