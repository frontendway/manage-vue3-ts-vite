<template>
  <div class="outer">
    <infinite
      v-model="loadingRef"
      :is-finished="isFinishedRef"
      @on-load="onLoad"
    >
      <waterfall
        :list="waterfallList"
        node-key="k"
        :column="5"
      >
        <template #default="{item, columnWidthRef}">
          <div>
            <img
              v-lazy-load="item.src"
              :style="{
                width: columnWidthRef + 'px'
              }"
            >
          </div>
        </template>
      </waterfall>
    </infinite>
  </div>
</template>

<script setup lang="ts">
import infinite from '@/components/infinite/index.vue'
import waterfall from '@/components/waterfall/index.vue'
import { ref } from 'vue'

const loadingRef = ref(false)
const isFinishedRef = ref(false)

const onLoad = () => {
  console.log('load')
  fetchList()
}

const sourceList: any[] = [
  { src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201903%2F11%2F20190311000407_tlxbh.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690789125&t=f2b100313eb747d1a23a46e0cc9e6258' },
  { src: 'https://images.pexels.com/users/avatars/61083217/ugurcan-ozmen-235.jpeg' },
  { src: 'http://t14.baidu.com/it/u=606838292,318337155&fm=224&app=112&f=JPEG?w=375&h=500' },
  { src: 'https://img-qn.51miz.com/Element/00/59/62/52/f888319c_E596252_7ec3f22e.jpg' },
  { src: 'https://img.cc0.cn/pixabay/2019103118063544171.jpg%21cc0.cn.jpg' },
  { src: 'https://img0.baidu.com/it/u=604444338,2767868618&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
  { src: 'https://img1.baidu.com/it/u=1849106027,2927344790&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888' },
  { src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201903%2F11%2F20190311000407_tlxbh.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690789125&t=f2b100313eb747d1a23a46e0cc9e6258' },
  { src: 'https://images.pexels.com/users/avatars/61083217/ugurcan-ozmen-235.jpeg' },
  { src: 'http://t14.baidu.com/it/u=606838292,318337155&fm=224&app=112&f=JPEG?w=375&h=500' },
  { src: 'https://img-qn.51miz.com/Element/00/59/62/52/f888319c_E596252_7ec3f22e.jpg' },
  { src: 'https://img.cc0.cn/pixabay/2019103118063544171.jpg%21cc0.cn.jpg' },
  { src: 'https://img0.baidu.com/it/u=604444338,2767868618&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
  { src: 'https://img1.baidu.com/it/u=1849106027,2927344790&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888' },
  { src: 'https://b0.bdstatic.com/ugc/uEFa3faKYrSnXPx07cl63geeb7f91b43f9c81b2fe00343a282c468.jpg@h_1280' },
  { src: 'https://img2.baidu.com/it/u=2823876420,3970126246&fm=253&fmt=auto&app=120&f=JPEG?w=1179&h=530' },
  { src: 'https://images.pexels.com/users/avatars/61083217/ugurcan-ozmen-235.jpeg' },
  { src: 'http://t14.baidu.com/it/u=606838292,318337155&fm=224&app=112&f=JPEG?w=375&h=500' },
  { src: 'https://img-qn.51miz.com/Element/00/59/62/52/f888319c_E596252_7ec3f22e.jpg' },
  { src: 'https://img.cc0.cn/pixabay/2019103118063544171.jpg%21cc0.cn.jpg' },
  { src: 'https://img0.baidu.com/it/u=604444338,2767868618&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
  { src: 'https://img1.baidu.com/it/u=1849106027,2927344790&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888' },
  { src: 'https://b0.bdstatic.com/ugc/uEFa3faKYrSnXPx07cl63geeb7f91b43f9c81b2fe00343a282c468.jpg@h_1280' },
  { src: 'https://img2.baidu.com/it/u=2823876420,3970126246&fm=253&fmt=auto&app=120&f=JPEG?w=1179&h=530' }
]

const waterfallList = ref<any[]>([])

const fetchList = () => {
  if (isFinishedRef.value) return

  waterfallList.value = [
    ...waterfallList.value,
    ...sourceList.slice(0, 10)
  ]
  if (!waterfallList.value.length) {
    waterfallList.value = sourceList.slice(0, 10)
  } else {
    waterfallList.value = [
      ...waterfallList.value.concat(sourceList.slice(10))
    ]
  }
  loadingRef.value = false
}

</script>

<style scoped>
.outer{
  width: 1280px;
  margin: 0px auto;
}
</style>
