<template>
  <div>
    <img
      ref="imgRef"
      src="./avatar.jpg"
      alt=""
      @click="onCroper"
    >
  </div>
  <button @click="onGetImg">
    确定
  </button>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref } from 'vue'

const imgRef = ref<HTMLImageElement>()

let cropper: Cropper | null = null

const onCroper = () => {
  cropper = new Cropper(imgRef.value!, {
    aspectRatio: 1
  })
}

// 获取裁剪后的图片
const onGetImg = () => {
  cropper?.getCroppedCanvas().toBlob(blob => {
    console.log(URL.createObjectURL(blob!))
  })
}

</script>

<style scoped>
img{
  width: 200px;
}
</style>
