<template>
  <div>
    主题替换
  </div>
</template>

<script setup lang="ts">

const setTheme = () => {
  const theme = matchMedia.matches ? 'dark' : 'light'
  console.log(theme)
}

const matchMedia = window.matchMedia('(color-schema: dark)')
matchMedia.onchange = () => {
  setTheme()
}

</script>

<style scoped>

</style>
