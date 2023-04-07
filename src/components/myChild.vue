<template>
  <div class="myChild">
    <div>count: {{state.count}}</div>
    <div>data: {{state.data}}</div>
    <div>arr: {{state.arr}}</div>
    <div>syncData: {{state.syncData}}</div>
    <div>str: {{str}}</div>
    <div>vuex-aa: {{aa}}</div>
    <div @click="bindChangParent">props: arr1 - {{props.arr1 ? props.arr1[0] : '---空数据--'}}</div>
    <div>---------------------childsaon-----------------</div>
    <div @click="bindCurrentInstance">点击获取子组件示例</div>
    <myChildSon ref="refMyChildSon" :syncData="state.syncData" @update:changesyncData="state.syncData = $event"></myChildSon>
  </div>
</template>

<script setup>
import myChildSon from '@/components/myChildSon.vue'

const refMyChildSon = ref(null);
const state = reactive({
  count:1,
  data: {
    a: '222'
  },
  arr:[3333],
  syncData: 'aaaaa'
})
const str = '这个是不需要响应时的数据';
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

const aa = computed(() => { return useStore().state.test.title})
watch(
    () =>  ['state.count'],
    (oldVal, newVal) => {
      console.log(oldVal, newVal)
    },
    { immediate: true}
)

const bindCurrentInstance = () => {
  // console.log(currentInstance.refs.myChildSon.count)
  refMyChildSon.value.changUpdate();
  refMyChildSon.value.state.count++;
}
</script>

<style lang="scss" scoped>

</style>
