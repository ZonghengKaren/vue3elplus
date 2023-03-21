<template>
  <div>
    <div>
      {{data1.conut}} --- {{data1.count2}} --- {{arr1}}
    </div>
    <myChild ref="Child" :arr1="arr1" @changeArr1="changeArr1"></myChild>
  </div>
</template>

<script>
import {reactive, toRefs, onMounted} from 'vue'
import myChild from '@/components/myChild.vue'

export default {
  components: {
    myChild
  },
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

    const changeArr1 = (data) => {
      state.arr1 = data
    }
    return {
      ...toRefs(state),
      changeArr1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
