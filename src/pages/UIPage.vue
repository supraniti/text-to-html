<template>
  <q-page class="row items-start">
    <div class="row justify-center fit q-pa-sm">
      <q-input
        v-model="prompt"
        :readonly="isFetching || !apiKey"
        :placeholder="apiKey ? `Let's prompt some magic` : `Please provide an API key`"
        counter
        filled
        clearable
        maxlength="200"
        style="width:80%; margin-top:16px"
        @keydown.enter.stop.prevent="newPrompt"
        @clear="prompt = ''"
      >
        <template v-slot:append>
          <q-icon
            v-if="!isFetching && prompt.length > 3"
            name="send"
            class="cursor-pointer"
            @click="newPrompt"
          />
        </template>
        <template v-slot:before>
          <q-btn
            rounded
            flat
            icon="key"
            :size="!apiKey ? 'lg' : 'md'"
            :color="!apiKey ? 'red' : 'grey'"
            @click="newKey"
          >
            <q-tooltip>
              Edit API Key
            </q-tooltip>
          </q-btn>
        </template>
      </q-input>
      <div data-id="block-controller" v-if="controllerEnabled && !isFetching" :style="getBlockControllerStyle">
        <q-bar>
          <q-btn size="sm" color="blue" class="edit" icon="edit" dense round flat @click="editBlock">
            <q-tooltip>
              Edit Block
            </q-tooltip>
          </q-btn>
          <q-btn size="sm" color="black" class="code"  dense flat :label="`<${selectedBlock}>`"/>
          <q-btn size="sm" color="red" class="delete" icon="delete" dense round flat @click="deleteBlock">
            <q-tooltip>
              Delete Block
            </q-tooltip>
          </q-btn>
        </q-bar>
      </div>
      <q-scroll-observer @scroll="handleScroll" />
      <template v-for="sketch in sketches" :key="sketch.uuid">
        <template v-if="sketch.isFetching">
          <div class="row q-pa-md full-width justify-center">
            <q-card flat bordered class="my-card">
              <q-card-section>
                <q-spinner-gears
                  color="black"
                  size="6em"
                />
              </q-card-section>
              <q-card-section class="q-pt-none text-overline">
                Processing...
              </q-card-section>
              <q-separator inset />
            </q-card>
          </div>
        </template>
        <sketch-controller
          v-else
          :sketch="sketch"
          :is-favorite="isFavorite(sketch)"
          @edit="editPrompt(sketch)"
          @delete="confirmDelete(sketch)"
          @favorite="$emit('favorite', sketch)"
          @fitScreen="$emit('fitScreen', sketch)"
          @click="debounceMouseMove($event,sketch)"
        />
        <q-separator spaced />
      </template>
    </div>
  </q-page>
</template>

<script lang="ts">

import { computed, defineComponent, reactive, ref } from 'vue'
import { sketch } from '../utils/utils'
import { useQuasar, debounce } from 'quasar'
import type { PropType } from 'vue'
import SketchController from 'components/SketchController.vue'

interface BlockControllerPosition {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default defineComponent({
  name: 'UIPage',
  props: {
    sketches: Array as PropType<sketch[]>,
    favorites: Array as PropType<sketch[]>,
    isFetching: Boolean,
    apiKey: String
  },
  components: { SketchController },
  emits: ['key', 'submit', 'delete', 'favorite', 'fitScreen', 'deleteBlock', 'editBlock'],
  setup (props, { emit }) {
    const prompt = ref('')
    const $q = useQuasar()
    const confirmDelete = (sketch:sketch) => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this sketch?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        emit('delete', sketch)
      })
    }
    const isFavorite = (sketch:sketch) => !!props.favorites?.find((item:sketch) => item.uuid === sketch.uuid)
    const editPrompt = (sketch:sketch) => {
      $q.dialog({
        title: 'Prompt',
        message: 'Enter edit prompt',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(prompt => {
        emit('submit', prompt, sketch)
      })
    }
    const newPrompt = () => {
      emit('submit', prompt.value)
    }
    const newKey = () => {
      $q.dialog({
        title: 'Open AI API Key',
        message: `Current Key: <p class="text-caption">${props.apiKey ? props.apiKey : 'Not provided'}</p> Please provide an api key`,
        html: true,
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(prompt => {
        emit('key', prompt)
      })
    }
    const getPromptHistory = (sketch:sketch) => {
      return [sketch.prompt, ...sketch.history.map(sketch => sketch.prompt)].reverse()
    }
    const blockControllerPosition = reactive<BlockControllerPosition>({
      width: 0,
      height: 0,
      x: 0,
      y: 0
    })
    const controllerEnabled = ref(false)
    const selectedBlock = ref()
    const blockDataIndex = ref()
    const sketchUUID = ref()
    const handleMouseMove = (event:any, sketch:sketch) => {
      const blockId = event.target.getAttribute('data-id')
      if (blockId && blockId !== 'assistant') {
        sketchUUID.value = sketch.uuid
        selectedBlock.value = blockId
        blockDataIndex.value = event.target.getAttribute('data-index')
        const { width, height, x, y } = event.target.getBoundingClientRect()
        Object.assign(blockControllerPosition, { width, height, x, y })
        controllerEnabled.value = true
      } else {
        blockDataIndex.value = ''
        selectedBlock.value = ''
        sketchUUID.value = ''
        controllerEnabled.value = false
      }
    }
    const handleScroll = (event:any) => {
      const { x, y } = blockControllerPosition
      const { delta } = event
      Object.assign(blockControllerPosition, { x: x - delta.left, y: y - delta.top })
    }
    const getBlockControllerStyle = computed(() => {
      return {
        width: `${blockControllerPosition.width + 8}px`,
        height: `${blockControllerPosition.height + 8}px`,
        top: `${blockControllerPosition.y - 4}px`,
        left: `${blockControllerPosition.x - 4}px`
      }
    })
    const debounceMouseMove = debounce(handleMouseMove, 10)
    const deleteBlock = () => {
      emit('deleteBlock', sketchUUID.value, blockDataIndex.value)
    }
    const editBlock = () => {
      $q.dialog({
        title: 'Prompt',
        message: 'Enter block level edit prompt',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(prompt => {
        emit('editBlock', prompt, sketchUUID.value, blockDataIndex.value)
      })
    }
    return { newKey, deleteBlock, editBlock, handleScroll, debounceMouseMove, prompt, isFavorite, confirmDelete, editPrompt, newPrompt, getPromptHistory, controllerEnabled, getBlockControllerStyle, selectedBlock, blockDataIndex }
  }
})
</script>
<style lang="scss" scoped>
[data-id=block-controller]{
  position:fixed;
  box-shadow:
    0 0 10px 5px rgba(0,0,0,0.7),
    0 0 10px 5px rgba(255,255,255,0.7);
  transition:all 50ms;
  pointer-events: none;
  cursor:pointer;
  z-index:1;
  background-color: rgba(255,255,255,0.7);
  borde-radius:8px;
  display:flex;
  flex-flow: row;
  justify-content: center;
  align-items: start;
  .edit, .delete, .code {
    pointer-events: all;
  }
}
</style>
