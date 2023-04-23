<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-black"
      elevated
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title>
          UI On The Fly
        </q-toolbar-title>
        <div>Text to HTML with GPT3.5</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >
      <q-list bordered separator>
        <q-item>
          <q-item-section avatar>
            <q-icon color="red-7" name="local_fire_department" />
          </q-item-section>
          <q-item-section>
          <q-item-section avatar>
            <q-badge color="red-7">
              Temperature: {{ temperature }}
            </q-badge>
          </q-item-section>
            <q-slider
              v-model="temperature"
              :min="0"
              :max="2"
              :step="0.1"
              :disable="isFetching"
              color="red-7"
            />
          </q-item-section>
        </q-item>
        <q-expansion-item
          v-for="item in favorites" :key="item.uuid"
          :label="item.history && item.history[0]
          ? `${item.history.slice(-1)[0].prompt}...${item.prompt}`
          : item.prompt"
        >
          <q-bar dense class="bg-black text-white">
            <q-icon name="token" />
            <div>{{item.usage}} tokens | </div>
            <q-icon name="hourglass_full" />
            <div>{{Math.floor(item.duration / 1000)}} sec</div>
            <q-space />
            <q-btn
              size="xs"
              icon="favorite"
              color="red"
              dense
              round
              flat
              @click="favorite(item)"
            >
              <q-tooltip>
                Remove from favorites
              </q-tooltip>
            </q-btn>
            <q-btn
              size="xs"
              icon="double_arrow"
              dense
              round
              flat
              @click="editFavorite(item)"
            >
              <q-tooltip>
                Edit item
              </q-tooltip>
            </q-btn>
          </q-bar>
          <q-card class="q-ma-sm" outline>
            <q-card-section>
              <div v-html="item.htmlString"/>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view
        :favorites="favorites"
        :sketches="sketches"
        :is-fetching="isFetching"
        :api-key="apiKey"
        @submit="onSubmit"
        @delete="onDelete"
        @favorite="favorite"
        @deleteBlock="deleteBlock"
        @editBlock="editBlock"
        @fitScreen="fitScreen"
        @key="onSubmitKey"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { reactive, defineComponent, ref, onBeforeMount } from 'vue'
import { sketch, uuid } from 'src/utils/utils'
import { replacementTailwind, textToTailwind } from 'src/API/uiPrompt'
import { getApiResponse } from 'src/API/apiRequest'
import { useQuasar } from 'quasar'
import { defaultTemperature } from 'src/API/consts'

export default defineComponent({
  name: 'MainLayout',
  setup: function () {
    const $q = useQuasar()
    const drawerOpen = ref(false)
    const isFetching = ref(false)
    const temperature = ref(defaultTemperature)
    const apiKey = ref()
    const favorites = reactive<sketch[]>([])
    const sketches = reactive<sketch[]>([])
    const getSketch = (uuid: string, sketches: sketch[]) => sketches.find((sketch: sketch) => sketch.uuid === uuid)
    const favorite = (sketch: sketch) => {
      const item = getSketch(sketch.uuid, favorites)
      if (item) {
        const index = favorites.indexOf(item)
        favorites.splice(index, 1)
      } else {
        favorites.unshift(sketch)
      }
      if (localStorage) {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    }
    const fitScreen = (sketch: sketch) => {
      sketch.fitScreen = !sketch.fitScreen
    }
    const editFavorite = (sketch: sketch) => {
      const item = getSketch(sketch.uuid, sketches)
      if (!item) {
        sketches.unshift(sketch)
      }
    }
    const onSubmit = async (prompt: string, currentSketch?: sketch, htmlString?: string, blockDataIndex?: string) => {
      const history: sketch[] = currentSketch ? [currentSketch, ...currentSketch.history] : []
      const promptHistory = history.map(sketch => sketch.prompt)
      const parser = new DOMParser()
      const context = {
        promptHistory,
        htmlString: htmlString || (currentSketch ? currentSketch.htmlString : '')
      }
      const unfilteredHtmlString = currentSketch ? currentSketch.htmlString : ''
      const htmlDocument = parser.parseFromString(unfilteredHtmlString, 'text/html')
      htmlDocument.querySelector('[data-id="assistant"]')?.remove()
      const filteredHtmlString = htmlDocument.documentElement.innerHTML
      const sketchDraft = {
        uuid: uuid(),
        prompt: blockDataIndex ? `${prompt}[block-index: ${blockDataIndex}]` : prompt,
        context,
        history,
        usage: 0,
        duration: 0,
        htmlString: filteredHtmlString,
        isFetching: true,
        fitScreen: currentSketch ? currentSketch.fitScreen : true
      }
      sketches.unshift(sketchDraft)
      const start = (new Date()).getTime()
      isFetching.value = true
      $q.notify({
        message: '<em>Note: It may take up to 1 minute to get a response from the gpt3.5 model. Most requests consume 500-3000 tokens, make sure to closely monitor your <a class="text-red" href="https://platform.openai.com/account/usage" target="_blank">usage</a></em>',
        color: 'black',
        html: true,
        timeout: 20000,
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => { /* ... */
            }
          }
        ]
      })
      const {
        isError,
        usage,
        newAssistantNode,
        newRootNode
      } = htmlString
        ? await getApiResponse(
          prompt,
          apiKey.value,
          replacementTailwind.enhancePrompt,
          replacementTailwind.translateResponse,
          context,
          temperature.value
        )
        : await getApiResponse(
          prompt,
          apiKey.value,
          textToTailwind.enhancePrompt,
          textToTailwind.translateResponse,
          context,
          temperature.value
        )
      isFetching.value = false
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const finish = (new Date()).getTime()
      const duration = finish - start
      const sketchInstance = getSketch(sketchDraft.uuid, sketches)

      if (sketchInstance) {
        sketchInstance.duration = duration
        sketchInstance.usage = usage
        sketchInstance.isFetching = false
        const newResponseString = `${newAssistantNode?.outerHTML}${newRootNode?.outerHTML}`
        if (isError) {
          sketchInstance.htmlString = newResponseString
          return
        }
        $q.notify({
          message: '<em>HTML Generated Successfully</em>',
          color: 'positive',
          html: true,
          timeout: 2000,
          actions: [
            {
              label: 'Dismiss',
              color: 'white',
              handler: () => { /* ... */
              }
            }
          ]
        })

        if (htmlString) {
          const doc = parser.parseFromString(sketchInstance.htmlString, 'text/html')
          if (newAssistantNode) {
            doc.documentElement.prepend(newAssistantNode)
          }
          if (newRootNode) {
            const newNode = newRootNode.querySelector(`[data-index="${blockDataIndex}"]`)
            const oldNode = doc.querySelector(`[data-index="${blockDataIndex}"]`)
            if (oldNode && newNode) {
              oldNode?.parentElement?.replaceChild(newNode, oldNode)
            }
            sketchInstance.htmlString = doc.documentElement.outerHTML
          }
        } else {
          sketchInstance.htmlString = newResponseString
        }
      }
    }
    const onDelete = (sketch: sketch) => {
      const index = sketches.indexOf(sketch)
      sketches.splice(index, 1)
    }
    const deleteBlock = (sketchUUID: string, blockDataIndex: string) => {
      const sketch = getSketch(sketchUUID, sketches)
      if (sketch) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(sketch.htmlString, 'text/html')
        const block = doc.querySelector(`[data-index="${blockDataIndex}"]`)
        block?.remove()
        sketch.htmlString = doc.documentElement.outerHTML
      }
    }
    const editBlock = (prompt: string, sketchUUID: string, blockDataIndex: string) => {
      const sketch = getSketch(sketchUUID, sketches)
      if (sketch) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(sketch.htmlString, 'text/html')
        const block = doc.querySelector(`[data-index="${blockDataIndex}"]`)
        onSubmit(prompt, sketch, block?.outerHTML, blockDataIndex)
      }
    }
    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value
    }
    const onSubmitKey = (event:string) => {
      apiKey.value = event
      localStorage.setItem('API_KEY', event)
    }
    onBeforeMount(() => {
      if (localStorage) {
        const storageFavorites = localStorage.getItem('favorites')
        const parsedFavorites = storageFavorites ? JSON.parse(storageFavorites) : []
        apiKey.value = localStorage.getItem('API_KEY')
        favorites.push(...parsedFavorites)
      }
    })
    return {
      temperature,
      isFetching,
      favorite,
      fitScreen,
      editFavorite,
      getSketch,
      onSubmit,
      onDelete,
      deleteBlock,
      editBlock,
      favorites,
      sketches,
      drawerOpen,
      apiKey,
      onSubmitKey,
      toggleDrawer
    }
  }
})
</script>
<style lang="scss">
[data-id=root] {
  transition:all 0.2s;
  height: fit-content !important;
  width: fit-content !important;
  max-width:500px;
}
.fit-screen {
  [data-id=root] {
    height: auto !important;
    width: auto !important;
    max-width: 100%;
  }
}

[data-id=assistant] {
  padding:8px;
  background-color: black;
  margin-bottom: 8px;
  border-radius: 8px;
  color: white;
  width: fit-content;
}
</style>
