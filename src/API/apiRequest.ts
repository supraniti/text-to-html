import { model, defaultTemperature, maxTokens, stop } from './consts'
interface ApiResponse {
  isError: boolean;
  usage: number;
  newAssistantNode: Element | null;
  newRootNode: Element | null;
}
export type TranslatedResponse = {
    newAssistantNode: Element | null;
    newRootNode: Element | null
  }

export const getApiResponse = (
  prompt:string,
  apiKey: string,
  enhancePrompt:(prompt:string, context?:Record<string, any>)=>string,
  translateResponse:(response:string)=>TranslatedResponse,
  context?:Record<string, any>,
  temperature?:number):Promise<ApiResponse> =>
  // fetch('https://api.openai.com/v1/chat/completions', {
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: temperature || defaultTemperature,
      max_tokens: maxTokens,
      stop,
      prompt: enhancePrompt(prompt, context)
      // messages: [{
      //   role: 'user',
      //   content: enhancePrompt(prompt, context)
      // }]
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        throw new Error(json.error?.message)
      }
      const {
        newAssistantNode,
        newRootNode
      // } = translateResponse(json.choices[0].message.content)
      } = translateResponse(json.choices[0].text)
      return {
        isError: false,
        usage: json.usage.total_tokens,
        newAssistantNode,
        newRootNode
      }
    })
    .catch((error) => {
      const newAssistantNode = document.createElement('div')
      const newRootNode = document.createElement('div')
      newAssistantNode.setAttribute('data-index', '0')
      newAssistantNode.setAttribute('data-id', 'assistant')
      newRootNode.setAttribute('data-index', '1')
      newRootNode.setAttribute('data-id', 'root')
      newAssistantNode.innerHTML = error.message
      return {
        isError: true,
        usage: 0,
        newAssistantNode,
        newRootNode
      }
    })
