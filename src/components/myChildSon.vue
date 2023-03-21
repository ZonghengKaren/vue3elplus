<template>
  <div class="myChild">
    <div>count: {{state.count}}</div>
    <div @click="changUpdate">使用update 修改父级数据</div>
  </div>
</template>

<script setup>
import {reactive, defineEmits} from 'vue'
const state = reactive({
  count:1,
  data: {
    a: '222'
  },
  arr:[3333]
})

const emits = defineEmits(['update:syncData'])

const changUpdate = () => {
  emits('update:syncData', 'vvvvvvv');
  console.log(34324);
}
</script>

<style lang="scss" scoped>

</style>
