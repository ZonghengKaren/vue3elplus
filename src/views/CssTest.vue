<template>
  <div class="CssTest">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.CssTest {
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  align-items: center;
  /* 父元素添加吸附样式  proximity:靠近 | mandatory:强制吸附 */
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
  /* overflow 要加上去作为可视区域 */
  overflow-y: scroll;

  .contain::-webkit-scrollbar {
    width: 0;
  }

  .item {
    width: 100%;
    height: 366px;
    font-size: 50px;
    color: #fff;
    text-align: center;
    //line-height: 366px;
    margin: 30px 0;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px #898989;
    background-color: green;
    /* 元素吸附：子元素设置 */
    /* 属性有 start ; center ; end */
    scroll-snap-align: start;
    /* 表示滚动的时候，要一个一个来 */
    scroll-snap-stop: always;

    &:nth-of-type(2) {
      height: 600px;
    }
    &:nth-of-type(3) {
      height: 200px;
    }
    &:nth-of-type(7) {
      height: 700px;
    }
  }
}
</style>