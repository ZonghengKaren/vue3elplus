<template>
  <div class="myChild">
    <div>count: {{state.count}}</div>
    <div>data: {{state.data}}</div>
    <div>arr: {{state.arr}}</div>
    <div>syncData: {{state.syncData}}</div>
    <div @click="bindChangParent">props: arr1 - {{props.arr1 ? props.arr1[0] : '---空数据--'}}</div>
    <div>---------------------childsaon-----------------</div>
    <myChildSon :syncData="state.syncData" @update:syncData="state.syncData = $event"></myChildSon>
  </div>
</template>

<script setup>
import {reactive, defineProps, defineEmits} from 'vue'
import myChildSon from '@/components/myChildSon.vue'
const state = reactive({
  count:1,
  data: {
    a: '222'
  },
  arr:[3333],
  syncData: 'aaaaa'
})
const props = defineProps({
  arr1: {
    type: Array,
    default: () => { return []}
  }
})
const emits = defineEmits(['changeArr1']);

const bindChangParent = () => {
  emits('changeArr1', [44,5446,646465])
  state.count++;
  state.data.b = 'rrrrr';
  state.arr[1] = '55555';
}
</script>

<style lang="scss" scoped>

</style>
