<template>
    <div id="map_container_1" style="width: 100%;height: 700px" v-if="state.showDemo"></div>
    <div class="selectBox">
        <el-select v-model="state.model" placeholder="Select" @change="bindChangeModel" :disabled="!state.showDemo">
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
// const jsonPath = require('@/utils/escher/iJO1366.json');
const d3Json = libs.d3_json;
const d3Select = libs.d3_select;
const data = {
    "e_coli_core": 'https://escher.github.io/1-0-0/6/maps/Escherichia%20coli/e_coli_core.Core%20metabolism.json',
    "iJO1366": 'https://escher.github.io/1-0-0/6/maps/Escherichia%20coli/iJO1366.Central%20metabolism.json',
    "RECON1": 'https://escher.github.io/1-0-0/6/maps/Homo%20sapiens/RECON1.Carbohydrate%20metabolism.json',
    "iMM904": 'https://escher.github.io/1-0-0/6/maps/Saccharomyces%20cerevisiae/iMM904.Central%20carbon%20metabolism.json',
}
const selectData = Object.keys(data);
let interVal = null;
let state = reactive({
    dataJson: {},
    model: 'e_coli_core',
    showDemo: true
})
let builderData = reactive({
    map: {
        nodes: {11: '33'}
    }
});

/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
    draw();
})

/**
 * 事件监听
 */
watch(
    () => [builderData.map.nodes],
    (newVal, oldVal) => {
        // console.log(oldVal);
        // console.log(newVal);
        // console.log('nodes:', Object.keys(newVal).length);
    },
    { immediate: true, deep: true}
)

/**
 * 事件函数 - 切换模型
 */
const bindChangeModel = () => {
    state.showDemo = false;
    setTimeout(() => {
        state.showDemo = true;
        draw();
    }, 500)
}
const firstLoadCallback = (res) => {
    // jsonData = data;
    // console.log('firstLoadCallback-data:', res);
    if (interVal) { clearInterval(interVal) }
    interVal = setInterval(() => {
        const reactions = builderData.map.reactions;
        const nodes = builderData.map.nodes;
        console.log('reactions:', Object.keys(reactions).length);
        console.log('nodes:', Object.keys(nodes).length);
    }, 10000)
}
const draw = () => {
    nextTick(() => {
        d3Json(data[state.model], function (e, data) {
            if (e) throw Error(e)

            state.dataJson = data;
            var options1 = {
                /* just show the zoom buttons */
                menu: 'all',
                // use the smooth pan and zoom option
                use_3d_transform: true,
                /* no editing in this map */
                enable_editing: true,
                /* no keyboard shortcuts */
                enable_keys: true,
                reaction_data: data,
                fill_screen: false,
                never_ask_before_quit: true,
                show_gene_reaction_rules: true,
                full_screen_button: true,
                first_load_callback: firstLoadCallback
            }
            builderData = Builder(data, null, null, d3Select('#map_container_1'), options1);
        })
    })
}

/**
 * 生命周期函数 - DOM卸载
 */
onUnmounted(() => {
    clearInterval(interVal);
})

</script>

<style lang="scss" scoped>
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