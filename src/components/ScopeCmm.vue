<template>
    <div id="scope-viewer" v-html="state.content" v-loading="state.loading"></div>
</template>

<script setup>
import axios from 'axios';
import { loadAllResource } from "@/utils/insertBIResource";
const jsPaths = [
    {type: 'js', url: '/scope-viewer/js/jquery-3.1.1.min.js'},
    {type: 'js', url: '/scope-viewer/js/cytoscape-2.7.16.min.js'},
    {type: 'js', url: '/scope-viewer/js/cola-1.4.3.js'},
    {type: 'js', url: '/scope-viewer/js/cytoscape-cola-1.4.3.js'},
    {type: 'js', url: '/scope-viewer/js/scope.js'},
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
        const res = await axios.get('/scope-viewer/scope_viewer.html');
        state.content = res.data;
        nextTick(() => {
            let scope_viewer = document.querySelector('#scope-viewer');
            loadAllResource(jsPaths, scope_viewer).then((res) => {
                window.onInitScope(() => {
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
        window.drawAttempt(res.data, '------');
        state.loading = false;
    } catch (err) {
        console.log(err)
    }
}
</script>
<style lang="less" scoped>
#scope-viewer {
    width: 100%;
    height: 650px;
}
</style>