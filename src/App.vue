<template>
    <div class="menu">
        <router-link to="/">Home</router-link> |
<!--        <router-link to="/about">About</router-link> |-->
<!--        <router-link to="/elform">Elform</router-link> |-->
<!--        <router-link to="/otherTest">OtherTest</router-link> |-->
<!--        <router-link to="/pinia">Pinia</router-link> |-->
        <router-link to="/eschortest">EschorTest</router-link> |
        <router-link to="/fbatest">FbaTest</router-link> |
        <router-link to="/scopeviewer">ScopeViewer</router-link> |
        <router-link to="/d3flux">D3Flux</router-link>
    </div>
    <router-view></router-view>
</template>
<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1rem;
}
.menu{
    font-size: 1rem;
}
</style>
