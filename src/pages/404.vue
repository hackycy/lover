<template>
  <div class="wscn-http404-container">
    <h1 class="maintitle">
      404<br>
      <span class="sorry">页面不存在</span><br>
      <router-link to="/">
        返回首页
      </router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Page404',
};
</script>

<style lang="scss" scoped>
.wscn-http404-container {
  height: 100vh;
  width: 100%;
  background: #333;

  .maintitle {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    color: #f9f1e9;
    text-align: center;
    letter-spacing: 0.1em;
    font-size: 12vh;
    line-height: 12vh;

    .sorry {
      font-size: medium;
      line-height: 1vh;
    }

    a {
      font-size: medium;
      line-height: 1vh;
      color: #f9f1e9;
    }

    a:link {
      color: #f9f1e9;
    }

    a:visited {
      color: #f9f1e9;
    }

    a:hover {
      color: #f9f1e9;
    }

    a:active {
      color: #f9f1e9;
    }

  }
}
</style>
