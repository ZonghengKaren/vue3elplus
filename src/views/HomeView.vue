<template>
  <div class="home">
    <div>
      <el-button type="primary" @click="$router.push('/elform')">表单验证</el-button>
    </div>
    {{state.data}}-------{{plusOne}}
    <div class="vuex-fontszie">vuex: 全局title {{$store.state.title}}</div>
    <div>vuex: 模块test 里面的title {{$store.state.test.title}} ---- {{store_title}}</div>
    <div @click="editTitle">修改vuex-test模块的title</div>
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

import { useStore } from "vuex";
import service from "@/utils/http/http";
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

    /**
     * 状态管理
     */
    const store = useStore();
    console.log(store.state.title);

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
    const editTitle = () => {
      store.commit('SET_TRAVEL_TITLE', 77777)
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
      store_title: computed(() => store.state.test.title),
      bindClick,
      editTitle,
      goAbout
    }
  }
}
</script>
<style lang="less">
.vuex-fontszie {
  width: 1rem;
  background-color: #2c3e50;
  border-radius: 50%;
  font-size: 0.12rem;
}
</style>