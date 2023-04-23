<template>
  <div class="row q-pa-md full-width justify-center">
    <q-spinner-gears
      v-if="sketch.isFetching"
      color="black"
      size="6em"
    />
    <q-card
      v-else
      flat
      bordered
      class="full-width"
    >
      <q-bar dense class="bg-black text-white">
        <q-icon name="token" />
        <div>{{sketch.usage}} tokens | </div>
        <q-icon name="hourglass_full" />
        <div>{{Math.floor(sketch.duration / 1000)}} sec</div>
        <q-space />
        <q-btn size="xs"
               icon="download"
               dense
               round
               flat
               @click="downloadHtml">
          <q-tooltip>
            Download HTML
          </q-tooltip>
        </q-btn>
        <q-btn size="xs"
               icon="fit_screen"
               dense
               round
               flat
               :color="sketch.fitScreen ? 'white' : 'grey'"
               @click="$emit('fitScreen')">
          <q-tooltip>
            Fit Size
          </q-tooltip>
        </q-btn>
        <q-btn
          size="xs"
          icon="favorite"
          :color="isFavorite ? 'red' : 'white'"
          dense
          round
          flat
          @click="$emit('favorite')"
        >
          <q-tooltip>
            Add to favorites
          </q-tooltip>
        </q-btn>
        <q-btn size="xs" icon="edit" dense round flat @click="$emit('edit')">
          <q-tooltip>
            Edit item
          </q-tooltip>
        </q-btn>
        <q-btn size="xs" icon="remove" dense round flat @click="$emit('delete')">
          <q-tooltip>
            Delete item
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div
          class="text-caption"
          v-for="(prompt, index) in getPromptHistory(sketch)"
          :key="index"
        >
          <q-icon size="2em" name="chat" />
          {{prompt}}
        </div>
      </q-card-section>
      <q-separator />
      <div :class="{'fit-screen': sketch.fitScreen}" class="html-response q-card__section q-card__section--vert" v-html="sketch.htmlString" />
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { sketch, SketchLayout } from 'src/utils/utils'
import { applyHtmlTemplate } from 'src/assets/htmlTemplate'

export default defineComponent({
  name: 'SketchController',
  props: {
    sketch: Object as PropType<sketch>,
    isFavorite: Boolean,
    layout: String as PropType<SketchLayout>
  },
  emits: ['edit', 'delete', 'favorite', 'fitScreen'],
  setup (props) {
    const getPromptHistory = (sketch:sketch) => {
      return [sketch.prompt, ...sketch.history.map(sketch => sketch.prompt)].reverse()
    }
    const downloadHtml = () => {
      const HTML = applyHtmlTemplate(props?.sketch?.htmlString || '')
      const parser = new DOMParser()
      const htmlDocument = parser.parseFromString(HTML, 'text/html')
      htmlDocument.querySelector('[data-id="assistant"]')?.remove()
      if (props?.sketch?.fitScreen) htmlDocument.querySelector('[data-id="root"]')?.parentElement?.classList.add('fit-screen')
      const blob = new Blob([htmlDocument.documentElement.outerHTML], { type: 'text/html' })
      const link = document.createElement('a')
      link.download = `${props?.sketch?.uuid}.html`
      link.href = window.URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    return { getPromptHistory, downloadHtml }
  }
})
</script>
<style lang="scss" scoped>
.html-response :deep(.flex) {
  flex-wrap: inherit;
}
</style>
