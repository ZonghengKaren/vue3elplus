<template>
    <div class="otherTest">

        <!--主体切换-->
        <span class="themeText">切换主题</span>
        <div class="themeBox">
            <span v-for="item in themes" :key="item.label" :style="'background-color: '+ item.value" @click="bindChangeTheme(item)"></span>
        </div>
        
        <!--clickOutSide-->
        <div class="otherTest-outSideClick">
            clickOutSide------------
            <el-button type="primary" size="small" @click="bindOutSideClick" v-onClickOutside="onClickOutside">outSideClick</el-button>
            <el-collapse-transition>
                <div class="otherTest-outSideClickBox" v-show="showBoxVisible"></div>
            </el-collapse-transition>
        </div>

        <!--directive-->
        <div>
            directive-----------
            <el-button type="primary" size="small" v-test="showBoxVisible">v-test</el-button>
        </div>
        <div v-resize="bindResze">

        </div>
        
        <!--Transition-->
        <div>
            Transition----------
            <el-button type="primary" size="small" @click="transitionVisible = !transitionVisible">Toggle</el-button>
            <Transition name="transitionTest">
                <p v-show="transitionVisible">Hello here is some bouncy text!</p>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import {changeTheme} from "@/utils/common";

let showBoxVisible = ref(false); // outSideClick
let transitionVisible = ref(true); // Transition
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
    myFun();
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
 * 事件函数 - 监听元素宽高变化
 */
const bindResze = () => {
  console.log(666666);
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

/**
 * 自定义函数 - 其他测试方法
 */
const myFun = () => {
    // for in 和 for of 区别
    // const arr = [{title: '1'}, {title: '2'}, {title: '3'}];
    // for ( let i in arr) {
    //     console.log(i);
    // }
    // const obj = {a:1, b: 2};
    // for (let i of obj) {
    //     console.log(i);
    // }

    // promise.all 和 promise.race 区别
    // let p1 = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         reject('p1成功')
    //     }, 3000)
    // })
    // let p2 = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         reject('p2成功')
    //     }, 2000)
    // })
    // let p3 = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         reject('p3失败')
    //     }, 4000)
    // })
    //
    // let p4 = new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve('p4失败')
    //     }, 1000)
    // })
    //
    // let p5 = Promise.race([p1, p2, p3, p4])
    // p5.then(res => {
    //     console.log('res:', res);
    // }).catch(err => {
    //     console.log('err:', err);  
    // })
    
    //Object.entries() 使用
    const obj2 = {a:1, b:2, c: 3}
    console.log(Object.entries(obj2))
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

/*动画 测试*/
.transitionTest-enter-active {
    animation: transitionTest-in 0.5s;
}
.transitionTest-leave-active {
    animation: transitionTest-in 0.5s reverse;
}
@keyframes transitionTest-in {
    //0% {
    //    transform: scale(0);
    //}
    //50% {
    //    transform: scale(1.25);
    //}
    //100% {
    //    transform: scale(1);
    //}

    0% {
        transform: scale(0) translate(1000px);
    }
    50% {
        transform: scale(1.25) translate(-100px);
    }
    100% {
        transform: scale(1) translate(0);
    }
}
</style>