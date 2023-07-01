<template>
  <div 
    ref="outerRef"
    class="waterfall-outer"
    :style="{
      height: outerHeightRef + 'px'
    }"
  >
    <template v-if="list.length">
      <div 
        class="waterfall-item" 
        v-for="(item, index) of list"
        :style="{
          width: columnWidthRef + 'px',
          height: item._style?.height + 'px',
          top: item._style?.top + 'px',
          left: item._style?.left + 'px'
        }"
      >
        <slot :item="item" :columnWidthRef="columnWidthRef"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IndexSign } from '@/types'
import { computed, ref, watch, nextTick } from 'vue';
import type { ColumnHeight, ImageHeight } from './types'

type Props = {
  list: IndexSign[]
  nodeKey: string
  column?: number
  columnSpace?: number
  rowSpace?: number
  prefetch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  column: 2,
  columnSpace: 20,
  rowSpace: 20,
  prefetch: true
}) 

// 最外层容器
const outerRef = ref()
// 最外层容器宽度
const outerWidthRef = ref(0)
// 最外层容器高度
const outerHeightRef = ref(0)
// 记录每列高度容器
const columnHeightsRef = ref<ColumnHeight>({})

// 构建每列高度
const useColumnHeight = () => {
  columnHeightsRef.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightsRef.value[i] = 0
  }
}
useColumnHeight()

// 获取最外层容器宽度
const useOuterWidth = () => {
  const outerEl = outerRef.value
  const clientWidth = outerEl.clientWidth
  const { paddingLeft, paddingRight } = getComputedStyle(outerEl)
  outerWidthRef.value = clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 每列宽度
const columnWidthRef = ref(0)
// 每列宽度总和
const columnTotal = computed(() => (props.column - 1) * props.columnSpace)

// 计算每列宽度
const useColumnWidth = () => {
  columnWidthRef.value = (outerWidthRef.value - columnTotal.value) / props.column
}

// 记录每个图片高度
let itemHeights: number[] = []

// 利用图片 onload 获取图片高度
const useItemHeights = () => {
  const promiseList: Promise<ImageHeight>[] = []
  let pixel = 0
  
  props.list.forEach(item => {
    const p = new Promise<ImageHeight>((resolve) => {
      const img = new Image()
      img.src = item.src
      img.onload = () => {
        pixel = columnWidthRef.value / img.width
        resolve({height: img.height * pixel})
      }
    })

    promiseList.push(p)
  })

  return Promise.all(promiseList)
  .then((items) => {
    items.forEach(item => {
      itemHeights.push(item.height)
    })
    useLocation()
  })
  .catch(() => {
    console.error('图片加载失败')
  })
}

const useLocation = () => {
  props.list.forEach((item, index) => {
    if (!item._style) item._style = {}

    item._style.left = getLeft()
    item._style.top = getTop()
    incrementColumnHeight(index)
    outerHeightRef.value = getMaxColumnHeight()
    console.log(outerHeightRef.value)
  })
}

// 获取最小列所在的高度
const getMinColumnHeight = () => {
  const heights = Object.values(columnHeightsRef.value)
  return Math.min(...heights)
}

// 获取最大列所在的高度
const getMaxColumnHeight = () => {
  const heights = Object.values(columnHeightsRef.value)
  return Math.max(...heights)
}

const getTop = () => getMinColumnHeight()

const getLeft = () => {
  const minHeight = getMinColumnHeight()
  const index = Object.keys(columnHeightsRef.value).find(key => columnHeightsRef.value[key] === minHeight)
  return (columnWidthRef.value + props.columnSpace) * Number(index)
}

// 自增最小列所在高度
const incrementColumnHeight = (index: number) => {
  const minHeight = getMinColumnHeight()
  const minIndex = Object.keys(columnHeightsRef.value).find(key => columnHeightsRef.value[key] === minHeight)
  columnHeightsRef.value[minIndex!] += itemHeights[index] + props.rowSpace
}

const init = () => {
  useOuterWidth()
  useColumnWidth()
  useItemHeights()
}

const reset = () => {
  outerWidthRef.value = outerHeightRef.value = 0
  itemHeights = []
  useColumnHeight()
}

watch(
  () => props.list,
  () => {
    nextTick(() => {
      reset()
      init()
    })
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.column,
  () => {
    nextTick(() => {
      reset()
      init()
    })
  }
)

</script>

<style scoped lang="scss">
.waterfall-outer{
  position: relative;
  .waterfall-item{
    position: absolute;
  }
}
</style>
