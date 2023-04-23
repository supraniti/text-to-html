export type requestResponse = {
  enhancePrompt: (...args: any[]) => string;
  translateResponse: (responseString:string) => { newAssistantNode: Element | null; newRootNode: Element | null }
}

export type sketchContext = {
  promptHistory: string[];
  htmlString: string;
}

export type sketch = {
  uuid: string,
  prompt: string,
  history: sketch[],
  usage: number,
  duration: number,
  htmlString: string,
  isFetching: boolean,
  fitScreen: boolean,
  context?: sketchContext
}

export enum sketchLayouts {
  MAIN='MAIN',
  SHOW_CASE='SHOW_CASE',
  SIDE_BAR='SIDE_BAR'
}

export type SketchLayout = keyof typeof sketchLayouts

export const uuid = () => Math.random().toString(16).slice(2) + Date.now().toString(16) + Math.random().toString(16).slice(2)
