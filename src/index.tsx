import { UseTools } from 'ai-jsx/batteries/use-tools';
import { ChatCompletion, UserMessage } from 'ai-jsx/core/completion';
import { AssistantMessage, ConversationHistory, SystemMessage, renderToConversation } from 'ai-jsx/core/conversation';
import { FixieAPIContext } from 'ai-jsx/batteries/fixie';
import { OpenAIClient } from 'ai-jsx/lib/openai';

export default async (_: any, { render, getContext }: any) => {
  const { url: apiBaseUrl, authToken } = getContext(FixieAPIContext);

  const conversation = await renderToConversation(<ConversationHistory />, render);
  // const metadata = conversation[0].element.props.metadata as any;
  let metadata
  let products = JSON.parse("./data.json")
  let messages = [
    {
        role: 'system',
        content:
        `You are an assistant who takes product requirements from a user and suggests the best product to choose out of for the user use case. If you do not have a recommendation ask the user for clarifying questions. Ask clarifying questions till you have completely nailed down the user needs. Once you have a recommendation choose out of these products ${products}. Only choose the products that fit in the use case.`,
    },
  ]

  messages.push(conversation[0].element.props.messages)

  const openai = new OpenAIClient({
    apiKey: authToken,
    baseURL: new URL('api/openai-proxy/v1', apiBaseUrl).toString(),
  })

  metadata = {
    model: 'gpt-4-0613',
    messages: messages,
    functions: [
    {
        name: 'askUserClarifyingQuestion',
        description:
        'Select this function if you still have clarifying questions to ask the user',
        parameters: {
        type: 'object',
            properties: {
                clarifyingQuestion: {
                    type: 'string',
                    description:
                        'Clarifying question for the user to understand their use case better',
                },
            },
        }
    },
    {
        name: 'makeRecommendations',
        description:
        'Select this function when you have a good idea about the user use case and want to make a recommendation',
        parameters: {
            type: 'object',
            properties: {
                productList: {
                    type: 'array',
                    description: 'an array of products and their recommendations for the user',
                    items: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Name of the product'
                            },
                            rating: {
                                type: 'string',
                                description: 'Product recommendation rating out of 5'
                            },
                            Pros: {
                                type: 'string',
                                description: 'What are pros of choosing this product for the users situation'
                            },
                            Cons: {
                                type: 'string',
                                description: 'What are cons of choosing this product for the users situation'
                            },
                        },
                    },
                },
            },
        },
    }
    ],
    // function_call: { name: 'findUserDetails' },
    function_call: 'auto',
  }
  const response = await openai.chat.completions.create(metadata);
  console.log(JSON.stringify(response));

  return (
    <AssistantMessage>
      {JSON.stringify(response)}
    </AssistantMessage>
  );
};
