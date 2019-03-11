import Axios from "axios";

let oneLeve=Axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5b9f01fe604c113bd0ceb9a2/mocklist/',
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
    return oneLeve.post('getDate');
}