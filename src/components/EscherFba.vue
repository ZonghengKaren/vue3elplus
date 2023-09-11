<template>
    <div id="EscherFba" class='App'>
        <div class="EscherContainer" id="EscherContainer"></div>
    </div>
</template>

<script setup>
import * as cobra from '@/utils/escher/cobra.js';
import * as escher from 'escher';
import modelData from '@/utils/escher/data/E coli core.json';
import map from '@/utils/escher/data/E coli core.Core metabolism.json';
import CobraWorker from 'worker-loader!babel-loader!@/utils/escher/cobra.worker';
import TooltipComponent from '@/utils/escher/TooltipComponent.jsx';
const underscore = escher.libs.underscore;
const cobraWorker = new CobraWorker();
let setReactionData = false;

/**
 * 初始化响应式数据
 */
let state = reactive({
    modelData,
    map,
    model: null,
    oldModel: null,
    reactionData: null,
    objectiveFlux: 0,
    helpOverlay: false,
    objectives: {},
    compoundObjectives: false,
    lowerRange: -25,
    upperRange: 25,
    step: 0.01,
    builder: null,
    koMarkersSel: null
})

/**
 * 生命周期函数 - 页面挂载
 */
 onMounted(() => {
    state.model = cobra.modelFromJsonData(state.modelData);
    state.oldModel = cobra.modelFromJsonData(state.modelData);
    for (let reaction of state.model.reactions) {
        if (reaction.objective_coefficient !== 0) {
            setObjective(reaction.id, reaction.objective_coefficient)
        }
    }
    myRunThrottledOptimization();

    // 初始化escher-builder 实例
     nextTick(() => {
         myInitBuilder();
     })
})

/**
 * 事件监听
 */
watch(
    () => state,
    (newVal, oldVal) => {
        if (newVal && state.builder && newVal.reactionData) {
            mySetPassProps(newVal);
            const reactionNewData = JSON.parse(JSON.stringify(newVal.reactionData));
            const reactionOldData = oldVal.reactionData ? JSON.parse(JSON.stringify(oldVal.reactionData)) : {};
            if (reactionNewData !== reactionOldData && !setReactionData)  {
                state.builder.set_reaction_data(reactionNewData);
                setReactionData = true;
            }
        }
    },
    {deep: true, immediate: true, flush: "post"}
)

/**
 * 自定义函数
 * @description 初始化escher-builder实例
 */
const myInitBuilder = () => {
    new escher.Builder(state.map, state.model, null, escher.libs.d3_select('#EscherContainer'), {
        menu: 'all',
        fill_screen: false,
        enable_keys: true,
        tooltip_component: TooltipComponent,
        enable_keys_with_tooltip: false,
        reaction_styles: ['color', 'size', 'text', 'abs'],
        disabled_buttons: ['Load reaction data'],
        never_ask_before_quit: true,
        first_load_callback: builder => {
            state.builder = builder;

            // 加载模型数据回调
            builder.callback_manager.set('load_model', modelData => {
                loadModel(modelData);
            })

            // 加载地图数据回调
            builder.callback_manager.set('load_map', mapData => {
                mySetPassProps(state)
            })
        }
    })
}

/**
 *自定义函数
 * @description 求解新的模型参数并更新reactionData和objectiveFlux以反映这些变化
 *
 */
const myRunOptimization = () => {
    let reactionData = null;
    let objectiveFlux = 'Infeasible solution/Dead cell';
    const modelData = JSON.parse(JSON.stringify(state.model));
    cobraWorker.postMessage(modelData);
    cobraWorker.onmessage = (message) => {
        const solution = message.data;
        if (solution.objectiveValue !== null) {
            reactionData = solution.fluxes;
            objectiveFlux = solution.objectiveValue.toFixed(3);
        }
        state.reactionData = reactionData;
        state.objectiveFlux = objectiveFlux;
    }
}

/**
 * 自定义函数
 * @description
 */
const myRunThrottledOptimization = () => {
    underscore.throttle(myRunOptimization(), 300);
};

/**
 * 自定义函数
 * @description 加载地图
 * @param {Object} newModel 地图数据对象
 */
const loadModel = (newModel) => {
    if (newModel === null) {
        state.modelData = null;
        state.model = null;
        state.oldModel = null;
        state.reactionData = null;
        state.objectiveFlux = null;
    }

    // load it twice so changes to model do not affect oldModel
    const model = cobra.modelFromJsonData(newModel)
    const oldModel = cobra.modelFromJsonData(newModel)
    const objectives = {}
    model.reactions.forEach(reaction => {
        if (reaction.objective_coefficient !== 0) {
            objectives[reaction.id] = reaction.objective_coefficient
        }
    })
    state.modelData = newModel;
    state.model = model;
    state.oldModel = oldModel;
    state.objectives = objectives;
    state.compoundObjectives = Object.keys(objectives).length > 1;
    myRunThrottledOptimization();
}

/**
 * 自定义函数
 * @description 循环浏览模型的反应列表，直到找到匹配BiGG ID参数，然后设置在找到新的通量集和设置反应数据的状态。
 * @param {Array} bounds 边界-反应的下和的二元数组上限。
 * @param {String} biggId 反应的BiGG ID.
 */
const sliderChange = (bounds, biggId) => {
    const reactions = [...state.model.reactions]
    for (let i = 0; i < reactions.length; i++) {
        if (reactions[i].id === biggId) {
            reactions[i].lower_bound = bounds[0]
            reactions[i].upper_bound = bounds[1]
            const prevModel = JSON.parse(JSON.stringify(state.model));
            state.model = { ...prevModel, reactions };
            break
        }
    }
    setReactionData = false;
    myRunThrottledOptimization()
}

/**
 * 自定义函数 - 给tooltip组件传递指定参数
 * @param { Object } props 参数对象
 */
const mySetPassProps = (props) => {
    props.sliderChange = sliderChange;
    props.setObjective = setObjective;
    state.builder.tooltip_container.passProps(props)
}

/**
 * 事件函数 - 点击重置地图
 * @description 官方扩展方法 （暂时不用）
 */
const bindResetMap = () => {
    const model = cobra.modelFromJsonData(state.modelData);
    const reactions = model.reactions;
    const objectives = {};
    for (let i = 0; i < reactions.length; i++) {
        const reaction = reactions[i];
        if (reaction.objective_coefficient) { // could be undefined or 0
            objectives[reaction.id] = reaction.objective_coefficient;
        }
    }
    state.model = model;
    state.objectives = objectives;
    state.compoundObjectives = Object.keys(objectives).length > 1;
    setReactionData = false;
    myRunThrottledOptimization();
}

/**
 * 事件函數
 * 循环浏览将所有目标系数设置为0的反应列表除了与它设置为1的给定BiGG ID匹配的那个。
 * 随后找到新的通量集，并设置reactionData，更改状态中的模型，并跟踪当前目标处于当前目标状态。
 * @param｛string｝biggId-反应的BiGG ID。
 * @param｛number｝coefficient-正或负1用于最大化和最小化
 */
const setObjective = (biggId, coefficient) => {
    const reactions = [...state.model.reactions];
    const index = reactions.findIndex(x => x.id === biggId)
    let objectives = {}
    if (state.compoundObjectives) {
        objectives = Object.assign({}, state.objectives)
        if (objectives[reactions[index].id] === coefficient && Object.keys(objectives).length > 1) {
            reactions[index].objective_coefficient = 0
            delete objectives[biggId]
        } else {
            reactions[index].objective_coefficient = coefficient
            objectives[biggId] = coefficient
        }
    } else {
        for (let reaction of reactions) {
            if (reaction.id === biggId) {
                reaction.objective_coefficient = coefficient
                objectives[biggId] = coefficient
            } else {
                reaction.objective_coefficient = 0
            }
        }
    }
    const prevModel = JSON.parse(JSON.stringify(state.model));
    state.model = { ...prevModel, reactions };
    state.objectives = objectives;
    setReactionData = false;
    myRunThrottledOptimization();
}

/**
 * 事件函數 - 切換化合物目标
 * @description 官方扩展方法 （暂时不用）
 */
const bindToggleCompoundObjectives = () => {
    state.compoundObjectives = !state.compoundObjectives;
    if (!state.compoundObjectives) {
        const model = cobra.modelFromJsonData(state.modelData)
        if (!model) { return }
        for (let reaction of model.reactions) {
            if (reaction.objective_coefficient !== 0) {
                setObjective(reaction.id, reaction.objective_coefficient)
                break
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#EscherFba {
    width: 90%;
    height: 800px;
    margin: 0 auto;
}
a:hover, a:visited, a:focus {
    color: #CF6965;
    text-decoration: underline;
}

a {
    color: #d9230f;
    text-decoration: none;
}

.App {
    text-align: center;
}

.App-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
}

.App-intro {
    font-size: large;
}

.appButton {
    color: white;
    clear: both;
    border: 1px solid #474949;
    background-image: linear-gradient(#4F5151, #474949 6%, #3F4141);
    background-color: #474949;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    text-decoration: none;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 18px;
    margin-right: 4px;
}
.appButton:hover, .appButton:visited, .appButton:focus {
    color: white;
    text-decoration: none;
}

.appButton#help {
    margin-bottom: 1px;
}

.appButton#close {
    position: absolute;
    bottom: 10px;
    right: 25px;
}

.appButton#home {
    margin-right: 4px;
    margin-bottom: 1px;
}

.appButton:active, .appButton.active {
    background-image: linear-gradient(#8f4f3f, #834c3c 6%, #8d3a2d);
}

.demoButton {
    margin: 0 3px;
    height: 27px;
    font-size: 16px;
    color: white;
    clear: both;
    border: 1px solid #474949;
    background-image: linear-gradient(#4F5151, #474949 6%, #3F4141);
    background-color: #474949;
    border-radius: 4px;
    text-align: center;
}

.bottomPanel {
    z-index: 2000;
    box-sizing: border-box;
    display: flex;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    justify-content: space-between;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.bottomPanel .statusBar {
    font-weight: 200;
    line-height: 1.42857143;
    box-sizing: border-box;
    height: 45px;
    color: red;
    background-color: white;
    font-size: 16px;
}

.helpOverlay {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    padding: 5% 0 80px;
    text-align: center;
}

.helpBox {
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    max-width: 520px;
    width: 90%;
    position: relative;
}

.helpContainer {
    box-sizing: border-box;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif!important;
    background-color: rgba(255, 255, 255, 0.953);
    color: #777;
    display: inline-block;
    position: relative;
    width: 100%;
    max-width: 520px;
    height: 100%;
    padding: 0 15px;
    padding-bottom: 20px;
    overflow-y: scroll;
    border-radius: 3px;
}

h3 {
    margin-top: 0;
}

p {
    text-align: left;
    margin-top: 0;
}

@media (max-width: 405px) {
    .bottomPanel {
        flex-direction: column;
    }
}
.EscherContainer {
    width: 100%;
    height: 700px;
}
</style>