<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/elform">Elform</router-link> | 
  <router-link to="/otherTest">OtherTest</router-link> |
  <router-link to="/pinia">Pinia</router-link> 
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
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
</style>
