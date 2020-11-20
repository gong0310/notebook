<template>
  <div class="add">
    <div class="header">
      <span class="back" @click="goback">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </span>
      {{header}}
      <span class="check">
        <i class="fa fa-check" @click="submit" aria-hidden="true"></i>
      </span>
    </div>
    <div class="content">
      <div class="title">
        <span>标题：</span>
        <input v-model.trim="info.title" type="text" />
      </div>
      <div class="chag">
        分类：
        <span :class="info.status==1?'act':''" @click="select(1)">公开</span>
        <span :class="info.status==2?'act':''" @click="select(2)">悄悄话</span>
      </div>
      <div class="title" v-show="ispasswads">
        <span>密码：</span>
        <input v-model.trim="passwads" type="text" />
      </div>
      <div class="cont">
        <span>内容：</span>
        <textarea v-model.trim="info.content"></textarea>
      </div>
    </div>
    <div class="toast" v-show="istoast">{{toast}}</div>
  </div>
</template>
<script>
import { addbook, editbook, updatebook, addpasswad } from "../api";
import { toRefs, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      info: {
        title: "",
        content: "",
        status: 1,
      },
      istoast: false,
      toast: "",
      ispasswads: false,
      passwads: "",
      header: "添加便签",
    });
    watch(
      () => state.info.status,
      (n, o) => {
        if (n == 1) {
          state.ispasswads = false;
        } else {
          state.ispasswads = true;
        }
      }
    );
    onMounted(() => {
      if (route.query._id) {
        state.header = "编辑便签";
        editbook({
          _id: route.query._id,
        }).then((res) => {
          state.info = res.data;
        });
      } else {
        state.header = "添加便签";
      }
    });
    const goback = () => {
      router.go(-1);
    };
    const select = (status) => {
      state.info.status = status;
    };
    //消息微提示
    const tips = (title) => {
      clearTimeout(state.tipTimer);
      state.toast = title;
      state.istoast = true;
      state.tipTimer = setTimeout(() => {
        state.istoast = false;
      }, 1500);
    };
    const addpasswads = () => {
      addpasswad({ passwads: state.passwads,status:state.info.status})
        .then((res) => {
          console.log(res);
        });
    };
    const submit = () => {
      addpasswads();
      if (!state.info.title || !state.info.content) {
        tips("请输入完整信息");
        return;
      }
      if (!route.query._id) {
        addbook(state.info).then((res) => {
          if (res.status == 200) {
            router.push("/");
          }
        });
      } else {
        updatebook({
          _id: route.query._id,
          ...state.info,
        })
          .then((res) => {
            if (res.status == 200) {
              router.push("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    return {
      ...toRefs(state),
      goback,
      submit,
      select,
    };
  },
};
</script>
<style lang="less" scoped>
.add {
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    color: #fff;
    font-size: 0.6rem;
    padding: 0.533333rem;
  }

  .header {
    height: 3rem;
    line-height: 3rem;
    background-color: #b0d6e1;
    font-size: 0.8rem;
    position: relative;
    color: #fff;
    .back {
      position: absolute;
      left: 0.533333rem;
    }
    .check {
      position: absolute;
      right: 0.533333rem;
    }
  }
  .content {
    background-image: url("../assets/img/bc2.jpg");
    background-position-x: 50%;
    padding: 0.533333rem;
    text-align: left;
    font-size: 0.8rem;
    min-height: 90vh;
    .chag {
      height: 2.133333rem;
      line-height: 2.133333rem;
      span {
        padding: 0.133333rem 0.466667rem;
        border-radius: 0.266667rem;
        background-color: #fff;
        margin: 0 0.133333rem;
      }
      .act {
        color: #b0d6e1;
      }
    }
    .title {
      margin: 0.533333rem 0;
      span {
        width: 20%;
      }
      input {
        border-bottom: 0.026667rem solid #fff;
        width: 80%;
        letter-spacing: 0.16rem;
      }
    }
    .cont {
      span {
        width: 20%;
      }
      textarea {
        vertical-align: top;
        letter-spacing: 0.16rem;
        width: 80%;
        min-height: 50vh;
        border: none;
        outline: none;
        background: transparent;
      }
    }
  }
}
</style>