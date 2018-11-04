<template>
  <div id="app">
    <header-nav>
      <span slot="left">电商网站示例</span>
      <router-link 
        slot="right"
        :to="{name:'Cart',params:{cart:$store.state.cartList}}"
        tag="span"
      >购物车<i class="icon" 
              v-show="$store.state.cartList.length"
            >{{$store.state.cartList.length}}</i>
      </router-link>
    </header-nav>
    <router-view/>
  </div>
</template>

<script>
import HeaderNav from "@/components/headerNav";
export default {
  name: 'App',
  components : {HeaderNav}
}
</script>

<style>
  body,p,h1,h2,h3,h4,h5,div,ul,li,ol,span,a,input{
    margin: 0;
    padding: 0;
  }
  a{text-decoration: none;}
  img{border:none;vertical-align: top;}
  input{outline: none;}
  li,ul,ol{list-style: none;}
  body{
    background-color: rgb(248, 248, 249);
    overflow-x:hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .icon{
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: red;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    text-align: center;
    line-height: 18px;
  }
</style>
