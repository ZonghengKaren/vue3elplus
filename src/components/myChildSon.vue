<template>
  <div class="myChild">
    <div>count: {{state.count}}</div>
    <div @click="changUpdate">使用update 修改父级数据</div>
  </div>
</template>

<script setup>

const state = reactive({
  count:1,
  data: {
    a: '222'
  },
  arr:[3333]
})

const emits = defineEmits(['update:changesyncData'])

const changUpdate = () => {
  emits('update:changesyncData', 'vvvvvvv');
  console.log(34324);
}

defineExpose({
  changUpdate,
  state
})
</script>

<style lang="scss" scoped>

</style>
