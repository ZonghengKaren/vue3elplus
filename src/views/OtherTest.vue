<template>
    <div class="otherTest">

        <!--clickOutSide-->
        <div class="otherTest-outSideClick">
            <el-button type="primary" size="small" @click="bindOutSideClick" v-onClickOutside="onClickOutside">outSideClick</el-button>
            <div class="otherTest-outSideClickBox" v-show="showBoxVisible"></div>
        </div>
    </div>
</template>

<script setup>
let showBoxVisible = ref(false); // outSideClick

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
}

</script>

<style lang="scss" scoped>
.otherTest {
    padding-top: 40px;
}
.otherTest-outSideClick {
    width: 140px;
    margin: 0 auto;
    position: relative;
    &Box {
        box-shadow: 4px 3px 4px 4px #2c3e50;
        width: 100%;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 60px;
        transform: translate(-50%, 0);
    }
}
</style>