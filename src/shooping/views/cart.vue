<template>
    <div class="cart">
        <div class="cart-init">
            <div class="cart-init-title">购物清单</div>
            <div class="cart-init-list">
                <ul>
                    <li class="cart-init-listTitle">
                        <span>商品信息</span>
                        <div>
                            <span>单价</span>
                            <span>数量</span>
                            <span>小计</span>
                            <span>删除</span>
                        </div>
                    </li>
                    <li
                        v-show="dataList.length"
                        v-for="(item,index) in dataList"
                        :key="index"
                        class="cart-init-listItem"
                    >
                        <img :src="item.image">
                        {{item.name}}
                        <div class="itemData">
                            <div>￥{{item.cost}}</div>
                            <div>
                                <input type="button" value="-" @click="change(index,-1)">
                                {{item.iNum}}
                                <input type="button" value="+" @click="change(index,1)">
                            </div>
                            <div>￥{{item.cost*item.iNum}}</div>
                            <div>
                                <a href="javascript:;" @click="deteleItem(index)">删除</a>
                            </div>
                        </div>
                    </li>
                    <li v-show="!dataList.length" class="cart-init-tip">购物车为空</li>
                </ul>
                <div class="cart-init-discount" v-show="dataList.length">
                    <div class="playma">
                        <span>使用优惠码:</span>
                        <input type="text" class="playText" v-model="code">
                        <input type="button" value="提交" @click="handleCode">
                    </div>
                    <div class="payArea">
                        <span>
                            共
                            <mark>{{getProduLength}}</mark>
                            件商品
                        </span>
                        <span>应付总额
                            <mark>￥{{getTotal}}</mark>
                        </span>
                        <span class="payBtn" @click="handleClick">现在结算</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Cart',
    data(){
        return {
            dataList : [],
            code : '',
            discount : 1
        }
    },
    created(){
        this.$store.dispatch('addCodeList');
        if(this.$route.params.cart){
            this.dataList=[...this.$route.params.cart];
        }
    },
    methods : {
        handleClick(e){
            alert('购买成功');
            this.dataList=[];
            this.$store.commit('reCartList','all')
        },
        handleCode(e){
            let codeList=this.$store.state.codeList;
            if(this.code==codeList[0].code){
                alert('优惠码使用成功');
                this.getTotal=codeList[0].discount;
                this.code='';
            }else{
                alert('优惠码输入错误');
            }
        },
        change(index,sign){
            let tmpArr=[...this.dataList];
            tmpArr.forEach((item,n)=>{
                if(index==n){
                    item.iNum+=sign;
                    if(item.iNum<0){
                        item.iNum=0;
                    }

                    if(item.iNum>20){
                        item.iNum=20;
                    }
                }
            });

            this.dataList=[...tmpArr];
        },
        deteleItem(index){
            this.dataList=this.dataList.filter((item,n)=>{
                return index!=n;
            })

            this.$store.commit('reCartList',index);
        }
    },
    computed : {
        getTotal : {
            get(){
                this.result=this.dataList.reduce((total,item)=>{
                    return total+(item.cost*item.iNum);
                },0);

                return Math.round(this.result*this.discount);
            },
            set(val){
                this.discount=val
            }
        },
        getProduLength(){
            return this.dataList.length;
        }
    }
}
</script>

<style lang="less" scoped>
    .cart{
        width: 100%;
        padding: 35px 30px;
        box-sizing: border-box;
        .cart-init{
            width: 1850px;
            position: relative;
            background-color: #fff;
            border-radius: 8px;
            border:solid 1px rgb(221, 222, 225);
            .cart-init-title{
                height: 55px;
                line-height: 55px;
                padding-left: 32px;
                box-sizing: border-box;
            }
            .cart-init-list{
                width: 100%;
                text-indent: 2em;
                box-sizing: border-box;
                .cart-init-listTitle{
                    border:solid 1px rgb(221, 222, 225);
                    border-right: none;
                    border-left: none;
                    padding-right: 80px;
                    height: 35px;
                    line-height: 35px;
                    background-color: rgb(238, 238, 238);
                    div{
                        float: right;
                        width: 500px;
                        display: flex;
                        justify-content: space-between;
                        span{
                            text-indent: 0;
                            width: 100px;
                            text-align: center;
                        }
                    }
                }
                .cart-init-tip{
                    text-align: center;
                    line-height: 180px;
                    border-bottom: none;
                }
                .cart-init-listItem{
                    width: 100%;
                    height: 60px;
                    border-bottom: dashed 1px rgb(233, 234, 236);
                    padding: 8px 5px;
                    padding-right: 80px;
                    line-height: 45px;
                    box-sizing: border-box;
                    img{
                        width: auto;
                        height: 100%;
                        margin-right: 5px;
                    }
                    .itemData{
                        width: 500px;
                        float: right;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        div{
                            text-align: center;
                            text-indent: 0;
                            width: 100px;
                        }
                        input[type="button"]{
                            border:none;
                            outline: none;
                            width: 25px;
                            height: 25px;
                            border-radius: 50%;
                            background-color: rgb(248, 248, 249);
                            box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
                            vertical-align: text-bottom;
                            cursor: pointer;
                        }
                    }
                }
            }
            .cart-init-discount{
                width: 100%;
                padding-left: 30px;
                box-sizing:border-box;
                height: 180px;
                position: relative;
                .playma{
                    position: absolute;
                    left: 0px;
                    top:20px;
                }
                .payArea{
                    width: 350px;
                    position: absolute;
                    right: 80px;
                    bottom: 30px;
                    display: flex;
                    text-indent: 0;
                    align-items: center;
                    justify-content: space-between;
                    span{
                        text-align: center;
                        mark{
                            font-style: none;
                            background-color: rgba(0,0,0,0);
                            color: red;
                        }
                    }
                    .payBtn{
                        display: block;
                        width: 100px;
                        height: 40px;
                        background-color: rgb(45, 140, 240);
                        line-height: 40px;
                        color: #fff;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>

