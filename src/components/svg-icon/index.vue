<template>
  <svg aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const iconName = computed(() => `#icon-${props.name}`)

</script>

<style lang="scss" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
