<template>
  <div>
    <slot />
    <div
      ref="loadingRef"
      class="loading-outer"
    >
      加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emits = defineEmits([
  'onLoad',
  'update:modelValue'
])

const loadingRef = ref()

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return

  emits('onLoad')
})

// 开始监听
onMounted(() => {
  intersectionObserver.observe(loadingRef.value)
})

</script>

<style scoped>

</style>
