<template>
    <div class="productPage">
        <div class="productPage-pay">
            <div class="productPage-pay-preiewImg">
                <img :src="Prde.image"/>
            </div>
            <div class="productPage-pay-title">
                <div class="productPage-pay-titleBox">
                    <h2>{{Prde.name}}</h2>
                    <span style="color:red">￥{{Prde.cost}}</span>
                    <div class="productPage-pay-titleBtn" @click="handleClick">加入购物车</div>
                </div>
            </div>
        </div>
        <div class="productPage-list">
            <h2>{{prevTitle}}</h2>
            <img :src="item.image" v-for="item in getImgList" :key="item.id">
        </div>
    </div>
</template>

<script>
export default {
    name : 'productPage',
    data(){
        return {
            prevTitle : '产品介绍'
        }
    },
    created(){
        this.$store.dispatch('addDatalist');
    },
    methods : {
        handleClick(e){
            this.$store.commit('addCartList',this.Prde);
        }
    },
    computed : {
        getImgList(){
            return this.$store.state.dataList;
        },
        Prde(){
            if(this.getImgList){
                let list=[...this.getImgList];
                let id=this.$route.params.id;
                let result={};
                list.forEach(item=>{
                    if(item.id==id){
                        result={...item};
                    }
                })
                return result;
            }else{
                return {};
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .productPage{
        width: 100%;
        padding: 35px 30px;
        .productPage-pay,.productPage-list{
            display: flex;
            height: 616px;
            width: 1850px;
            background-color: #fff;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 8px;
            border:solid 1px rgb(221, 222, 225);
            div{
                width: 50%;
                text-align: center;
                img{
                    height: 100%;
                }
                &.productPage-pay-title{
                    position: relative;
                    .productPage-pay-titleBox{
                        position: absolute;
                        left: 50%;
                        top:50%;
                        transform: translate(-50%,-55%);
                        span{
                            display: block;
                            margin: 10px 0;
                        }
                        .productPage-pay-titleBtn{
                            width: 208px;
                            height: 36px;
                            border-radius: 4px;
                            background-color: rgb(45, 140, 240);
                            color: #fff;
                            line-height: 34px;
                            cursor: pointer;
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
        .productPage-list{
            display: block;
            height: auto;
            margin-top: 30px;
            h2{
                text-align: center;
                margin-top: 15px;
            }
            img{
                display: block;
                width: 50%;
                margin: 40px auto;
                padding: 32px;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(221, 222, 225);
            }
        }
    }
</style>
