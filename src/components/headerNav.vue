<template>
  <div class="h-nav">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props : {
    title : {
      type : String,
      default : '电商网站示例'
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped lang="less">
  .h-nav{
    display: flex;
    display: -webkit-flex;
    height: 50px;
    background-color: rgb(50, 50, 50);
    justify-content: space-between;
    align-items: center;
    margin-top: -3px;
    padding: 0 40px;
    box-sizing: border-box;
    span{
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
</style>
