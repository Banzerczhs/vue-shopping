<template>
    <div class="product">
        <router-link
            :to="{path : '/product/'+info.id}"
            class="product-main"
        >
            <img :src="info.image" :alt="info.name">
            <h4>{{info.name}}</h4>
            <div 
                class="product-color"
                :style="{background : colorMap[info.color]}"
            ></div>
            <div class="product-cost">￥{{info.cost}}</div>
            <div
                class="product-add-cart"
                @click.prevent="handleCart"
            >加入购物车</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name : 'Product',
    props : {
        info : Object
    },
    data(){
        return {
            colorMap : {
                '白色' : '#ffffff',
                '金色' : '#dac272',
                '蓝色' : '#233472',
                '红色' : '#f2352e'
            }
        }
    },
    methods : {
        handleCart(){
            this.$emit('add',this.info);
        }
    }
}
</script>

<style lang="less" scoped>
    .product{
        width: 23%;
        border-radius: 6px;
        border: #dddee1 solid 1px;
        background-color: #fff;
        position: relative;
        float: left;
        padding: 16px;
        box-sizing: border-box;
        margin: 17px;
        .product-main{
            display: block;
            width: 100%;
            height: auto;
            text-align: center;
            img{
                width: 100%;
            }
            h4{
                color: #222;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            &:hover h4{
                color: #0070c9;
            }
            .product-color{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border:solid 1px rgb(222, 223, 226);
                margin: 8px auto;
            }
            .product-cost{
                color: red;
                font-size: 16px;
            }
            .product-add-cart{
                width: 78px;
                height: 26px;
                border-radius: 4px;
                color: #fff;
                font-size: 14px;
                padding: 3px 8px;
                display: none;
                overflow: hidden;
                position: absolute;
                right: 5px;
                top:5px;
                background-color: rgb(45, 140, 240);
                line-height: 26px;
            }
            &:hover .product-add-cart{
                display: block;
            }
        }
    }
</style>