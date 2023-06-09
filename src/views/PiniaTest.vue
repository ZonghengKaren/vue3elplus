<template>
  <div class="piniaTest">
    <div :key="piniaCount">pinia-count:{{piniaCount}}</div>
    <el-button type="primary" size="small" @click="bindEditPinia">修改Pinia 数据</el-button>
  </div>
</template>

<script setup>
import {useMyStore} from "@/store/piniaTest";
const { count: piniaCount } = computed(() => storeToRefs(useMyStore())) ;

/**
 * 事件函数 -  修改pinia 数据
 */
const bindEditPinia = () => {
  useMyStore().increment(3);
}
</script>

<style lang="scss" scoped>

</style>