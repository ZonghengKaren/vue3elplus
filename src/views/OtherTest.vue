<template>
    <div class="otherTest">

        <!--主体切换-->
        <span class="themeText">切换主题</span>
        <div class="themeBox">
            <span v-for="item in themes" :key="item.label" :style="'background-color: '+ item.value" @click="bindChangeTheme(item)"></span>
        </div>
        
        <!--clickOutSide-->
        <div class="otherTest-outSideClick">
            <el-button type="primary" size="small" @click="bindOutSideClick" v-onClickOutside="onClickOutside">outSideClick</el-button>
            <el-collapse-transition>
                <div class="otherTest-outSideClickBox" v-show="showBoxVisible"></div>
            </el-collapse-transition>
        </div>

        <el-button type="primary" size="small" v-test="showBoxVisible">v-test</el-button>
    </div>
</template>

<script setup>
import {changeTheme} from "@/utils/common";

let showBoxVisible = ref(false); // outSideClick
let themes = [
    {
        label: 'black',
        value: '#333'
    },
    {
        label: 'white',
        value: '#FFF'
    },
    {
        label: 'blue',
        value: '#248aef'
    }
]

/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
    const str = 33.33;
    console.log(typeof str);
    console.log(Object.prototype.toString.call(str));
    console.log(Object.prototype.toString.call(str) === '[object Number]');
    changeTheme('black');
})

// outSideClick相关
/**
 * 事件函数 - 点击outSideClick按钮
 */
const bindOutSideClick = () => {
    console.log('我点了outSideClick');
    showBoxVisible.value = true;
}
/**
 * 事件函数 - 点击outSideClick按钮
 */
const onClickOutside = () => {
    console.log('我点了bodyle ');
    showBoxVisible.value = false;
}

/**
 * 事件函数 - 切换主题
 * @param item
 */
const bindChangeTheme = (item) => {
    changeTheme(item.label);
}

</script>

<style lang="less" scoped>
.otherTest {
    height: 100vh;
    padding-top: 40px;
    background-color: @primary-bg-color;
}
.themeBox {
    display: flex;
    justify-content: center;
    span {
        flex: 0 0 60px;
        height: 30px;
        cursor: pointer;
        border-radius: 4px;
        margin-right: 10px;
        border: 1px solid #42b983;
    }
}
.otherTest-outSideClick {
    width: 140px;
    margin: 0 auto;
    position: relative;
    &Box {
        box-shadow: 1px 3px 4px 4px #248aef;
        width: 200px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translate(-50%, 0);
    }
}
.themeText {
    color: @primary-text-color;
}
</style>