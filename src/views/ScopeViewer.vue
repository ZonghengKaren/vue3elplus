<template>
    <div id="scope_viewer" v-html="state.content"></div>
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
let state = reactive({
    content: ''
});
onMounted(() => {
    myInitPage();
})
const myInitPage = async () => {
    try {
        const res = await axios.get('/scope-viewer/scope_viewer.html');
        state.content = res.data;
        nextTick(() => {
            let scope_viewer = document.querySelector('#scope_viewer')
            loadAllResource(jsPaths, scope_viewer).then((res) => {
                window.onInitScope(() => {
                    myLoadData();
                });
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const myLoadData = async () => {
    try {
        const res = await axios.get('/scope-viewer/data/pinocembrin_scope.json');
        nextTick(() => {
            window.drawAttempt(res.data, '------');
        })
    } catch (err) {
        console.log(err)
    }
}
</script>
<style lang="scss" scoped>
#scope_viewer {
    width: 100%;
    height: 800px;
}
</style>