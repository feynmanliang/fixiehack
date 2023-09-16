## How to use Fixie Sidekick proxy

`fixie serve`

```sh 
curl 'https://api.fixie.ai/api/v1/agents/feynmanliang/fixie-sidekick-template/conversations' \
  -d '{ "message": {"text": ""}, "metadata": {"messages": [{"role": "system", "content": "system message"}, {"role": "user", "content": "user message"}, {"role": "assistant", "content": "assistant message"}, {"role": "user", "content": "second user message"}]}}' \
  -H "Authorization: Bearer $FIXIE_API_KEY" \
  -H 'Content-Type: application/json' 
```
