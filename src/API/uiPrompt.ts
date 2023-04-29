import { sketchContext, requestResponse } from '../utils/utils'
import { TranslatedResponse } from 'src/API/apiRequest'

export const enhancePromptTailwind = (prompt:string, context?:sketchContext):string => `
<request context="web design" prompt="trick or treat save button">
  <tasks>
    <task id="create_button" description="create a button matching the prompt">
      <responseFields>
        <div data-id="assistant" />
        <div data-id="root" syntax="tailwind_css" icons="material-icons" images="placeimg.com" />
      </responseFields>
    </task>
  </tasks>
</request>
<response>
  <tasks>
    <task id="create_button">
      <div data-id="assistant">Here's a save button, with orange theme matching trick or treat spirit</div>
      <div data-id="root">
        <button data-id="button_1" class="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center space-x-2">
          <i data-id="icon_1" class="material-icons w-5 h-5 text-black">save</i>
          <span data-id="label_1">Save</span>
        </button>
      </div>
    </task>
  </tasks>
</response>
<request prompt="${prompt}">
  <context>${context?.htmlString ? context.htmlString : 'web design'}</context>
  <tasks>
    <task id="generate_html" description="generate html matching the prompt. make sure all blocks have data-id attribute value set to their name and id, assistant field is required">
      <responseFields>
        <div data-id="assistant" />
        <div data-id="root" syntax="tailwind_css" data-id="blockname_id" icons="material-icons" images="via.placeholder.com" />
      </responseFields>
    </task>
  </tasks>
</request>
<response>
  <tasks>
    <task id="generate_html">`

export const translateResponseTailwind = (responseString:string):TranslatedResponse => {
  const parser = new DOMParser()
  const newDoc = parser.parseFromString(responseString, 'text/html')
  Array.from(newDoc.querySelectorAll('*')).forEach((block, index) => {
    if (!block.getAttribute('data-index')) block.setAttribute('data-index', String(index))
  })
  const newAssistantNode = newDoc.querySelector('[data-id="assistant"]')
  const newRootNode = newDoc.querySelector('[data-id="root"]') || newDoc.documentElement
  return { newAssistantNode, newRootNode }
}

export const textToTailwind:requestResponse = {
  enhancePrompt: enhancePromptTailwind,
  translateResponse: translateResponseTailwind
}

export const replacementPromptTailwind = (prompt:string, context?:sketchContext):string => `
example:
<request prompt="add details">
  <context>
    <html>
      <button data-id="button_1">
        <span data-id="label_1">Save</span>
      </button>
    </html>
  </context>
  <tasks>
    <task id="tailwind_edit" description="edit the html in the context to fulfill the prompt request">
      <responseFields>
        <div data-id="assistant" />
        <div data-id="root" syntax="tailwind_css" icons="material-icons" images="https://via.placeholder.com" />
      </responseFields>
    </task>
  </tasks>
</request>
<response>
  <tasks>
    <task id="tailwind_edit">
      <div data-id="assistant">Here's a detailed save button, with colors, spacing, and an icon</div>
       <div data-id="root">
        <button data-id="button_1" class="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center space-x-2">
          <i data-id="icon_1" class="material-icons w-5 h-5 text-black">save</i>
          <span data-id="label_1">Save</span>
        </button>
      </div>
    </task>
  </tasks>
</response>
Please provide a detailed <response> object in accordance to structure described in the request body:
<request prompt="${prompt}">
  <context>
    ${context?.htmlString}
  </context>
  <tasks>
    <task id="tailwind_edit" description="edit the html in the context to fulfill the prompt request, preserve data-index attribute">
        <div data-id="assistant" />
        <div data-id="root" syntax="tailwind_css" icons="material-icons" images="placeimg.com" />
z    </task>
  </tasks>
</request>`

export const replacementTranslateResponseTailwind = (responseString:string):string => {
  const envelope = document.createElement('div')
  envelope.innerHTML = responseString
  let htmlString = '<div>Sorry... Something went wrong please try again</div>'
  const htmlElements = envelope.querySelector('#tailwind_edit')
  if (htmlElements) {
    if (Array.from(htmlElements.children).length > 1) {
      htmlString = `<div>${htmlElements.innerHTML}</div>`
    } else if (htmlElements.firstElementChild) {
      htmlString = htmlElements.innerHTML
    }
  }
  return htmlString
}

export const replacementTailwind:requestResponse = {
  enhancePrompt: replacementPromptTailwind,
  translateResponse: translateResponseTailwind
}
