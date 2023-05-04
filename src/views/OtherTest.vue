<template>
    <div class="otherTest">

        <!--clickOutSide-->
        <div class="otherTest-outSideClick">
            <el-button type="primary" size="small" @click="bindOutSideClick" v-onClickOutside="onClickOutside">outSideClick</el-button>
            <el-collapse-transition>
                <div class="otherTest-outSideClickBox" v-show="showBoxVisible"></div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script setup>
let showBoxVisible = ref(false); // outSideClick

/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
    const str = 33.33;
    console.log(typeof str);
    console.log(Object.prototype.toString.call(str));
    console.log(Object.prototype.toString.call(str) === '[object Number]');
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
        box-shadow: 1px 3px 4px 4px #248aef;
        width: 200px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 100px;
        transform: translate(-50%, 0);
    }
}
</style>