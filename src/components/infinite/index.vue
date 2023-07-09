<template>
  <div>
    <slot />
    <div ref="loadingRef">
      <div v-show="modelValue">
        加载更多
      </div>
      <div v-show="isFinished">
        没有更多数据
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  modelValue: boolean
  isFinished: boolean
}

const props = defineProps<Props>()

const emits = defineEmits([
  'onLoad',
  'update:modelValue'
])

const loadingRef = ref()

const intersectionObserver = new IntersectionObserver((entries) => {
  const isHiden = entries[0].intersectionRatio <= 0
  if (isHiden || props.modelValue || props.isFinished) return

  emits('update:modelValue', true)
  emits('onLoad')
})

// 开始监听
onMounted(() => {
  intersectionObserver.observe(loadingRef.value)
})

</script>
