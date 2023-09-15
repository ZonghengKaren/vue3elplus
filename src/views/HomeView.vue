<template>
  <div class="home">
    <div>
      <el-button type="primary" @click="$router.push('/elform')">表单验证</el-button>
    </div>
    {{state.data}}-------
    <div class="vuex-fontszie">vuex: 全局title {{$store.state.title}}</div>
    <div>vuex: 模块test 里面的title {{$store.state.test.title}} ---- {{store_title}}</div>
    <div @click="editTitle">修改vuex-test模块的title</div>
    <div @click="bindClick">新增</div>
    <div @click="$router.push('/about')">跳转</div>
    <el-button type="primary" @click.stop="goAbout">事件跳转</el-button>
      <div>-------------datalist-----------</div>
    <div v-for="item in curData.datalist" :key="item.id">
      <div>{{item.username}}</div>
      <div>{{item.phone}}</div>
    </div>
      <div>-------------datalist2-----------</div>
      <div>{{curData.datalist2}}</div>
  </div>
</template>

<script>

import { useStore } from "vuex";
import service from "@/utils/http";
import router from '@/router'

export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    let state = ref({});
    let curData = reactive({
        datalist: [],
        datalist2: 0,
    })

    onMounted(() => {
      state.value.data = 1;
      getdata(0);
      getdata(1);
      getdata(2);
      getdata(3);
      getdata2();
    })

    /**
     * 监听属性
     */
    watch(
        () => [state.value.data, curData.datalist],
        async (newValue, oldValue) => {
          // newValue === oldValue
          // console.log(newValue, oldValue)
        },
        { deep: true}
    )

    /**
     * 状态管理
     */
    const store = useStore();

    let getdata = async (data) => {
      try {
        const res0 = await service.apiGet('/users', {halfwayCancel: true, num: data});
        console.log('/users----', res0);
        curData.datalist = res0;
        const arr = curData.datalist.map((item) => {return item.username});
      } catch (err) {
        console.log('datalist-----', err)
      }

    }

    let getdata2 = async () => {
      try {
          const res0 = await service.apiPost('/posts', {halfwayCancel: true, t: 1});
          console.log('/posts----', res0);
          curData.datalist2 = res0 ? res0.length : 0;
      } catch (err) {
        console.log('datalist2-err:---', err);
      }

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
      state, curData,
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