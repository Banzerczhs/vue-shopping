<template>
    <div class="list">
        <div class="list-sort">
            <p :key="cd.title" v-for="cd in shaiData">
                <span>{{cd.title}}:</span>
                <span 
                    v-for="(item,index) in cd.child" 
                    :key="item" 
                    :class="{'active':cd.currentIndex===index}"
                    @click="handleClick(cd.title,index,$event)"
                >{{item}}</span>
            </p>
            <p v-for="item in sortData" :key="item.title">
                <span>{{item.title}}:</span>
                <span
                    v-for="(td,index) in item.child"
                    :key="td.name"
                    :class="{'active':item.currentIndex===index,'sort-desc':item.currentIndex===index&&td.sort=='desc','sort-asc':item.currentIndex===index&&td.sort=='asc'}"
                    @click="sortHandle(index,td,$event)"
                >{{td.name}}</span>
            </p>
        </div>
        <div class="list-data">
            <product
                v-for="item in filteredAndOrderdList"
                :key="item.id"
                :info="item"
                @add="handleAdd"
            ></product>
            <div
                v-show="show"
            >暂无商品</div>
        </div>
    </div>
</template>

<script>
import Product from "@/components/product";

let shaiData=[
    {
        title : '品牌',
        currentIndex : '', 
        child : ['Apple','Beats','Sonos','B&O','Bose']
    },
    {
        title : '颜色',
        currentIndex : '',
        child : ['白色','金色','红色','蓝色']
    }
]

let sortData=[
    {
        title : '排序',
        currentIndex : 0,
        child : [
            {
                name : '默认',
                tab : false,
                type : 'normal',
                sort : 'normal'
            },
            {
                name : '销量',
                tab : false,
                type : 'sales',
                sort : 'desc'
            },
            {
                name : '价格',
                tab : true,
                type : 'cost',
                sort : 'desc'
            }
        ]
    }
]
export default {
    name : 'List',
    data(){
        return {
            shaiData,
            sortData,
            brand : '',
            color : '',
            order : '',
            show : false
        }
    },
    created(){
        this.$store.dispatch('addDatalist');
    },
    computed : {
        infos(){
            return this.$store.state.dataList;
        },
        filteredAndOrderdList(){
            let _this=this;
            if(this.infos){
                let listData=[...this.infos];
                let tmp=[];
                if(this.brand&&this.color){
                    let a=listData.filter(item=>{
                        if(item.brand==this.brand){
                            return item;
                        }
                    });
                    tmp.push(...a.filter(item=>{
                        if(item.color==this.color){
                            return item;
                        }
                    }))
                }else if(this.brand){
                    tmp.push(...listData.filter(item=>{
                        if(item.brand==this.brand){
                            return item;
                        }
                    }))
                }else if(this.color){
                    tmp.push(...listData.filter(item=>{
                        if(item.color==this.color){
                            return item;
                        }
                    }))
                }

                
                listData=(this.brand||this.color)||tmp.length?tmp:listData;
                if(!listData.length){
                    this.show=true;
                }else{
                    this.show=false;
                }

                switch(this.order.sort){
                    case 'desc':
                        listData.sort(function(a,b){
                            return b[_this.order.type]-a[_this.order.type];
                        });
                        break;
                    case 'asc':
                        listData.sort(function(a,b){
                            return a[_this.order.type]-b[_this.order.type];
                        });
                        break;
                }
                return listData;
            }
        }
    },
    methods : {
        handleClick(title,index,e){
            let _this=this;
            shaiData.forEach(item=>{
                if(title==item.title){
                    if(item.currentIndex!==index){
                        item.currentIndex=index;
                        isShai(item.child[index],title);
                    }else{
                        item.currentIndex='';
                        isShai('',title);
                    }
                }
            })

            function isShai(val,title){
                switch(title){
                    case '品牌':
                        _this.brand=val;
                        break;
                    case '颜色':
                        _this.color=val;
                        break;
                }
            }
            
            this.$emit('test',123);
        },
        sortHandle(iNum,obj,e){
            let [list]=sortData;
            list.currentIndex=iNum;
            if(obj.tab&&e.target.classList.contains('active')){
                obj.sort=obj.sort=='desc'?'asc':'desc';
            }

            this.order={
                type : obj.type,
                sort : obj.sort
            }
        },
        handleAdd(ev){
            this.$store.commit('addCartList',ev)
        }
    },
    components : {Product}
}
</script>

<style lang="less" scoped>
    .list{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        .list-sort{
            margin-left: 18px;
            margin-right: 33px;
            background-color: #fff;
            border-radius: 6px;
            box-sizing: border-box;
            box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
            padding: 8px 20px;
            p{
                margin: 16px 0;
                span{
                    &:not(:first-child){
                        border:solid 1px rgb(233, 234, 236);
                        padding: 5px 8px;
                        border-radius: 4px;
                    }
                    margin: 0 5px;
                    cursor: pointer;
                    -webkit-user-select: none;
                    user-select: none;
                    position: relative;
                    &.active{
                        background-color: rgba(243, 40, 40, 0.876);
                        color: #fff;
                    }
                    &.sort-desc::after{
                        content: "↓";
                        display: inline-block;
                        position: relative;
                        left: 3px;
                    }
                    &.sort-asc::after{
                        content: "↑";
                        display: inline-block;
                        position: relative;
                        left: 3px;
                    }
                }
            }
        }
        .list-data{
            &::after{
                content: "";
                display: block;
                clear: both;
            }
        }
    }
</style>


