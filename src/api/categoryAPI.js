import {axiosClient} from './axiosClient';

const CategoryAPI = {
    getAll(){
        const url = `/categories`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    // addCate(data, token ){
    //     const userAdd = JSON.parse(localStorage.getItem('token'));
    //     var token = userAdd.token;
    //     var userId = userAdd.user._id;

    //     const url = `/category/create/${userId}`;
    //     return axiosClient.post(url, data, {
    //         headers: { 'Authorization': 'Bearer ' + token}
    //     });
    // },
    addCate(data){
        const url = `/category/create`;
        return axiosClient.post(url, data);
    },
    remove(id){
        const url = `/category/${id}`;
        return axiosClient.delete(url);
    },
    update(id, data){
        const url = `/category/${id}`;
        return axiosClient.put(url, data);
    }
}

export default CategoryAPI;