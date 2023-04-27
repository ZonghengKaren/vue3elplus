<template>
    <div class="otherTest">
        <div class="otherTest-outSideClick">
            <el-button type="primary" size="small" @click="bindOutSideClick" v-on-click-outside="onClickOutside">outSideClick</el-button>
            <div class="otherTest-outSideClickBox" v-show="showBoxVisible"></div>
        </div>
    </div>
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'
let showBoxVisible = ref(false);
const bindOutSideClick = () => {
    console.log('我点了outSideClick');
    showBoxVisible.value = true;
}
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