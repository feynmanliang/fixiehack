import type { Message } from '~/types'

const TOKEN = import.meta.env.VITE_TOKEN;

export async function askQuestionOrMakeInitialRecommendation(conversation: Message[]) {
  // let products = JSON.parse("./data.json")
  let products = {};
  let messages = [
    {
        role: 'system',
        content:
        `You are an assistant who takes product requirements from a user and suggests the best product to choose out of for the user use case. If you do not have a recommendation ask the user for clarifying questions. Ask clarifying questions till you have completely nailed down the user needs. Once you have a recommendation choose out of these products ${products}. Only choose the products that fit in the use case.`,
    },
    ...conversation
  ]

  const metadata = {
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
  };

  const body = {
    message: {text: ""},
    metadata
  };
  const resp = await fetch(
    'https://api.fixie.ai/api/v1/agents/feynmanliang/fixie-sidekick-template/conversations',
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(body)
    }
  );
  const lines = (await resp.text()).split('\n');
  const openAiResponse = JSON.parse(JSON.parse(lines[lines.length-2]).turns.slice(-1)[0].messages[0].content);

  // TODO: if its a function call, JSON.parse it 

  return openAiResponse.choices[0].message.content;
}
