import Axios from "axios";

let oneLeve=Axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5bc30fc6b0bf35423bd75347/list/',
    headers : {
        'content-type' : 'application/x-www-form-urlencoded',
        'custom-header' : 'Banzer'
    },
    transformRequest(data){
        return data;
    },
    transformResponse(data){
        return data;
    }
})

export const getDataList=()=>{
    return oneLeve.post('listData');
}