<template>
  <div class="home">
    {{state.data}}-------{{plusOne}}
    <div @click="bindClick">新增</div>
    <div @click="$router.push('/about')">跳转</div>
    <el-button type="primary" @click.stop="goAbout">事件跳转</el-button>
    <div v-for="item in datalist" :key="item.id">
      <div>{{item.username}}</div>
      <div>{{item.phone}}</div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed, watch} from "vue";
import service from "@/utils/http";
import router from '@/router'

export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    let state = ref({});
    let datalist = ref([]);
    let datalist2 = ref([]);

    onMounted(() => {
      state.value.data = 1;
      getdata();
      getdata2();
    })

    /**
     * 监听属性
     */
    const plusOne = computed(() =>  state.value.data + 1 );

    /**
     * 监听属性
     */
    watch(
        () => [state.value.data, datalist.value],
        async (newValue, oldValue) => {
          // newValue === oldValue
          console.log(newValue, oldValue)
        },
        { deep: true}
    )

    let getdata = async () => {
        const res = await service.get('/users');
        console.log(res);
        datalist.value = res.data;
        const arr = datalist.value.map((item) => {return item.username});
        console.log(arr);
    }

    let getdata2 = async () => {
      const res = await service.get('/posts');
      datalist2.value = res.data;
      console.log(datalist2);
    }

    const bindClick = () => {
      state.value.data += 2
    }

    /**
     * 跳转函数 - 跳转到关于我们
     */
    const goAbout = () => {
      router.push('/about')
    }

    return {
      state,
      datalist,
      plusOne,
      bindClick,
      goAbout
    }
  }
}
</script>
