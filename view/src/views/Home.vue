<template>
  <div class="home">
    <div class="header">
      <div class="title">
        便签
        <span @click="add">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </span>
      </div>
      <p>便签数</p>
      <div class="count">
        <span>{{list.length}}</span>个
      </div>
      <div class="tis" v-for="i in classList" :key="i._id">{{i.name}}{{i.items.length}}个</div>
    </div>
    <div class="content">
      <ul>
        <li v-for="i in list" :key="i._id" @click="edit(i._id,i.status,$event)">
          <div class="l">
            <div class="title">{{i.title}}</div>
            <div class="date">{{i.dates}}</div>
          </div>
          <div class="r">
            <i
              @click="change(i._id,i.star,$event)"
              :style="i.star?'color: #fdb238;':''"
              class="fa fa-star"
              aria-hidden="true"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <Load :isload="loading" />
    <!-- alter弹框 -->
    <transition name="alter" mode>
      <div class="box" v-show="isalter">
        <div class="text">
          <div class="centen">{{alters}}</div>
          <input type="text" v-model="passward" />
          <div class="true" @click="hideAlter">确定</div>
        </div>
      </div>
    </transition>
     <div class="toast" v-show="istoast">{{toast}}</div>
  </div>
</template>

<script>
import { getList, updatebook, getclassList, chexkpasswad } from "../api";
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import Load from "../components/loading";
export default {
  name: "Home",
  components: { Load },
  setup(props,ctx) {
    console.log(ctx)
    let router = useRouter();
    const state = reactive({
      list: [],
      loading: false,
      classList: [],
      alters: "",
      isalter: false,
      passward: "",
      id:'',
      istoast: false,
      toast: "",
    });
    const add = () => {
      router.push("/add");
    };
    const change = (id, star, e) => {
      updatebook({
        _id: id,
        star: !star,
      })
        .then((res) => {
          if (res.status == 200) {
            getdata();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      e.stopPropagation();
    };
    const edit = (id, status, e) => {
       state.id=id
      e.stopPropagation();
      if (status == 2) {
        alter("请输入密码");
        return;
      }
     
      router.push({
        path: "/add",
        query: {
          _id: id,
        },
      });
    };
    //弹框
    const alter = (text) => {
      state.isalter = true;
      state.alters = text;
    };
    const getclass = async () => {
      let { data } = await getclassList();
      state.classList = data;
    };
    const hideAlter = () => {
      chexkpasswad({
        passwads: state.passward,
      }).then((res) => {
       
        if (res.data!='') {
          state.isalter = false;
          router.push({
            path: "/add",
            query: {
              _id: state.id,
            }
          });
        }else{
           tips("密码错误");
           state.passward=''
           state.isalter = false;
        }
      });
    };
    const getdata = () => {
      state.loading = true;
      getList().then((res) => {
        state.list = res.data.map((i) => {
          i.isstar = false;
          let year = new Date(i.date).getFullYear();
          let month = new Date(i.date).getMonth() + 1;
          let date = new Date(i.date).getDate();
          let hour = new Date(i.date).getHours();
          let min = new Date(i.date).getMinutes();
          i.dates =
            year + "-" + month + "-" + date + " " + hour + ":" + min + "分";
          return i;
        });
        state.loading = false;
      });
    };
      //消息微提示
    const tips = (title) => {
      clearTimeout(state.tipTimer);
      state.toast = title;
      state.istoast = true;
      state.tipTimer = setTimeout(() => {
        state.istoast = false;
      }, 1500);
    }
    onMounted(() => {
      getdata();
      getclass();
    });
    return {
      ...toRefs(state),
      add,
      edit,
      change,
      hideAlter,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
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

  .box {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    input {
      border-bottom: 0.026667rem solid #ccc;
    }
    .text {
      width: 85%;
      height: auto;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 0.8rem;
      overflow: hidden;
      transform: translate(-50%, -50%);
      padding: 1rem;

      .centen {
        width: 100%;
        padding: 1rem 0;
        // height: 5.666667rem;
        // line-height: 5.666667rem;
        font-weight: 600;
        text-align: center;
        font-size: 1rem;
        // border-bottom: 0.026667rem solid #f6f6f6;
      }

      .true {
        width: 100%;
        height: 1.2rem;
        // background-color: red;
        line-height: 2rem;
        text-align: center;
        font-size: 1rem;
        color: #576b95;
        font-weight: 600;
      }
    }
  }

  .alter-enter-active {
    animation: alter 0.3s;
  }

  .alter-leave-active {
    animation: alter 0.3s reverse;
  }

  @keyframes alter {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  .header {
    width: 100%;
    height: 30%;
    background-image: url("../assets/img/bc.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 50%;
    color: #fff;
    .title {
      padding: 0.533333rem 0;
      box-sizing: border-box;
      font-size: 0.96rem;
      // font-weight: 600;
      position: relative;
      span {
        position: absolute;
        box-sizing: border-box;
        right: 0.533333rem;
        color: #fff;
        cursor: pointer;
      }
    }
    p {
      text-align: left;
      padding-left: 0.8rem;
      box-sizing: border-box;
    }
    .count {
      height: 3.2rem;
      text-align: left;
      padding: 0.533333rem 0;
      padding-left: 0.8rem;
      box-sizing: border-box;
      span {
        font-size: 2.613333rem;
      }
    }
    .tis {
      text-align: left;
      padding: 0.3rem 0.8rem;
      box-sizing: border-box;
    }
  }
  .content {
    margin: 0.533333rem;
    box-sizing: border-box;
    ul {
      margin: 0;
      li {
        width: 100%;
        margin: 0.533333rem 0;
        height: 3.2rem;
        background-color: #fff;
        border-radius: 0.266667rem;
        box-shadow: 0 3px 3px rgba(204, 204, 204, 0.14),
          0 0 5px rgba(204, 204, 204, 0.12);
        position: relative;
        overflow: hidden;
        &::after {
          content: "";
          display: inline-block;
          width: 0.266667rem;
          height: 100%;
          background-color: #b0d6e1;
          position: absolute;
          left: 0;
        }
        .l {
          float: left;
          font-size: 0.853333rem;
          text-align: left;
          padding: 0.266667rem;
          padding-left: 0.8rem;
          box-sizing: border-box;
          height: 100%;
          div {
            height: 1.4rem;
            line-height: 1.4rem;
          }
          div:nth-child(2) {
            color: #ccc;
            font-size: 0.746667rem;
          }
        }
        .r {
          float: right;
          padding-right: 0.8rem;
          height: 100%;
          line-height: 3rem;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
