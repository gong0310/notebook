<template>
  <div class="loading" v-show="isload">
    <div class="text">
      <span></span>加载中...
    </div>
  </div>
</template>
<script>
import { toRefs, reactive } from "vue";
export default {
  props: ["isload"],
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  color: #fff;

  .text {
    height: 100vh;
    line-height: 100vh;
    text-align: center;
    font-size: 1rem;

    span {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      // background-color: red;
      border-radius: 50%;
      border: 0.026667rem solid #fff;
      margin-right: 0.266667rem;
      border-top: none;
      border-right: none;
      animation: turn 1s linear infinite;
    }

    @keyframes turn {
      0% {
        transform: translateY(20%) rotate(0deg);
      }

      100% {
        transform: translateY(20%) rotate(360deg);
      }
    }
  }
}
</style>