<template>
    <div id="map_container_1" style="width: 100%;height: 700px" v-if="state.showDemo"></div>
    <div class="selectBox">
        <el-select v-model="state.map" placeholder="Select" @change="bindChangeModel" :disabled="!state.showDemo">
            <el-option
                v-for="item in selectData"
                :key="item"
                :label="item"
                :value="item"
            />
        </el-select>
    </div>
</template>

<script setup>
import Builder, {libs} from 'escher';
import axios from 'axios';
const d3Select = libs.d3_select;
const maps = {
    "e_coli_core": 'https://escher.github.io/1-0-0/6/maps/Escherichia%20coli/e_coli_core.Core%20metabolism.json',
    "iJO1366": 'https://escher.github.io/1-0-0/6/maps/Escherichia%20coli/iJO1366.Central%20metabolism.json',
    "RECON1": 'https://escher.github.io/1-0-0/6/maps/Homo%20sapiens/RECON1.Carbohydrate%20metabolism.json',
    "iMM904": 'https://escher.github.io/1-0-0/6/maps/Saccharomyces%20cerevisiae/iMM904.Central%20carbon%20metabolism.json',
}
const selectData = Object.keys(maps);
let interVal = null;
let state = reactive({
    map: 'iJO1366', // 模型名称
    showDemo: true, // 是否显示
    mapDataLen: 0 // 地图数据长度
})

/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
    myInitDraw();
})

/**
 * 事件函数 - 切换模型
 */
const bindChangeModel = () => {
    state.showDemo = false;
    setTimeout(() => {
        state.showDemo = true;
        myInitDraw();
    }, 500)
}

/**
 * 事件函数 - 监听地图第一次渲染完后回调
 * @param {Object} res Builder 对象
 */
const bindFirstLoadCallback = (res) => {
    if (interVal) { clearInterval(interVal) }
    interVal = setInterval(() => {
        const len = Object.keys(res.map_data[1].nodes).length;
        console.log(len);
        if (len !== state.mapDataLen) {
            // 异步处理 刷新数据列表
        }
        state.mapDataLen = len;
    }, 5000)
}

/**
 * 自定义函数 - 初始化地图
 */
const myInitDraw = async () => {
    try {
        const map = await axios.get(maps[state.map]);
        const model = await axios.get('https://escher.github.io/1-0-0/6/models/Escherichia%20coli/iJO1366.json');
        let options1 = {
            menu: 'all',
            use_3d_transform: true,
            enable_editing: true,
            enable_keys: true,
            reaction_data: map.data,
            fill_screen: false,
            never_ask_before_quit: true,
            show_gene_reaction_rules: true,
            full_screen_button: true,
            first_load_callback: bindFirstLoadCallback
        }
        Builder(map.data, model.data, null, d3Select('#map_container_1'), options1);
    } catch (err) {
        console.log('err', err);
    }
}

/**
 * 生命周期函数 - DOM卸载
 * @description 清除定时器
 */
onUnmounted(() => {
    clearInterval(interVal);
})
</script>

<style lang="less" scoped>
#EschorTest {
    width: 90%;
    height: 800px;
    margin: 0 auto;
}
.selectBox {
    width: 220px;
    background-color: #2c3e50;
    position: fixed;
    z-index: 2000;
    right: 40px;
    bottom: 40px;
}
</style>