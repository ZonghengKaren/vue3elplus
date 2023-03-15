<template>
  <div>
    {{data1.conut}} --- {{data1.count2}} --- {{arr1}}
  </div>
</template>

<script>
import {reactive, toRefs, onMounted} from 'vue'

export default {
  setup() {
    const state = reactive({
      data1: {
        conut: 0
      },
      arr1: ['aaaaa']
    })

    onMounted(() => {
      state.data1.conut++;
      state.data1.count2 = 2;
      state.arr1[1] = 'bbbb';
    })

    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
