<template>
<transition name="fade" mode="out-in">
  <router-view/>
</transition>

</template>
<script>
export default {
  components:{
  },
  setup(){

  }
}
</script>
<style lang="less">
.fade-enter-active {
    animation: alter 0.4s;
}

.fade-leave-active {
    animation: alter 0.4s reverse;
}

@keyframes alter {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(0%);
    }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
