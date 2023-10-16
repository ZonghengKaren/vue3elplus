<template>
    <div id="d3-flux" v-html="state.content" v-loading="state.loading"></div>
</template>

<script setup>
import axios from 'axios';
import { loadAllResource } from "@/utils/insertBIResource";
const jsPaths = [
    {type: 'js', url: '/d3flux/js/require.min.js'},
    {type: 'js', url: '/d3flux/js/jquery-3.1.1.min.js'},
    {type: 'js', url: '/d3flux/js/scope.js'},
]

// 响应式数据
let state = reactive({
    content: '', // 静态文件内容
    loading: false
})

// 数据接收
const prpos = defineProps({
    apiPath: {
        type: String,
        default: ''
    }
})

/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
    state.loading = true;
    myInitPage();
})

/**
 * 自定义函数 - 初始化化页面
 * @returns {Promise<void>}
 */
const myInitPage = async () => {
    try {
        const res = await axios.get('/d3flux/d3flux.html');
        state.content = res.data;
        nextTick(() => {
            let element = document.querySelector('#d3-flux');
            loadAllResource(jsPaths, element).then((res) => {
                window.onInitFlux(() => {
                    myDrawAttempt();
                });
            })
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * 自定义函数 - 绘制树状图
 * @returns {Promise<void>}
 */
const myDrawAttempt = async () => {
    if (!prpos.apiPath) { return }
    try {
        const res = await axios.get(prpos.apiPath);
        window.fluxMain(res.data);
        state.loading = false;
    } catch (err) {
        console.log(err)
    }
}
</script>
<style lang="less" scoped>
#d3flux {
    width: 100%;
}
</style>