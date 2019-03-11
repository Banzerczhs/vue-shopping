import Vue from "vue";
import Vuex from "vuex";
import {getDataList} from "@/server";

Vue.use(Vuex);
let json = {};
let store=new Vuex.Store({
    state : {
        dataList : null,
        cartList : [],
        codeList : [] 
    },
    getters : {

    },
    actions : {
        async addDatalist(context){
            let {data}=await getDataList();
            
            let {data:list}=JSON.parse(data);
            context.commit('getProductList',list);
        },
        addCodeList(context){
            let codeData=[{
                code : '43hjl12ol463',
                discount : '0.8'
            }]
            setTimeout(() => {
                context.commit('getCodes',codeData);
            },200);
        }
    },
    mutations : {
        getProductList(state,data){
            state.dataList=[...data];
        },
        addCartList(state,data){
            if(state.cartList.length){
                let n=0;
                state.cartList.forEach(item=>{
                    if(item.id==data.id){
                        item.iNum++;
                        return;
                    }
                    n++;
                })

                if(n==state.cartList.length){
                    data.iNum=1;
                    state.cartList.push(data);
                }
            }else{
                data.iNum=1;
                state.cartList.push(data);
            }
        },
        reCartList(state,data){
            if(data!='all'){
                state.cartList=state.cartList.filter((item,index)=>{
                    return index!=data;
                })
            }else{
                state.cartList=[];
            }
            
        },
        getCodes(state,data){
            state.codeList=data;
        }
    }
});

export default store;
