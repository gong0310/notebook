import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000/books/'
export function getList(parameter){
    return axios({
        url: 'getlist',
        method: 'get',
        params: parameter
    })
}
export function getclassList(parameter){
    return axios({
        url: 'getclasslist',
        method: 'get',
        params: parameter
    })
}
export function addbook(parameter){
    return axios({
        url: 'addbook',
        method: 'post',
        data: parameter
    })
}
export function editbook(parameter){
    return axios({
        url: 'editbook',
        method: 'get',
        params: parameter
    })
}
export function updatebook(parameter){
    return axios({
        url: 'updatebook',
        method: 'get',
        params: parameter
    })
}
export function addpasswad(parameter){
    return axios({
        url: 'addpasswad',
        method: 'get',
        params: parameter
    })
}
export function chexkpasswad(parameter){
    return axios({
        url: 'chexkpasswad',
        method: 'get',
        params: parameter
    })
}
