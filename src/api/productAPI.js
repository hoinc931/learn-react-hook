import {axiosClient} from './axiosClient';

const ProductApi = {
    // getAll(){
    //     const url = `/products?_limit=12`;
    //     return axiosClient.get(url);
    // },
    getAllAdmin(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    getListLimit8(){
        const url = `/productslimit8`;
        return axiosClient.get(url);
    },
    // getCate(id){
    //     const url = `/product/${id}/?_expand=category&_limit=2`;
    //     return axiosClient.get(url);
    // },
    // addProduct(product, token){
    //     const auth = JSON.parse(localStorage.getItem('token'));
    //     var token = auth.token;
    //     const userId = auth.user._id;
    //     const url = `/productAdd/create/${userId}`;
    //     return axiosClient.post(url, product, {
    //         headers: { 'Authorization': 'Bearer ' + token}
    //     });
    // },
    addProduct(product){
        const url = `/productAdd/create`;
        return axiosClient.post(url, product);
    },
    remove(id){
        const url = `/product/${id}`;
        return axiosClient.delete(url);
    },
    // update(id, data){
    //     const url = `/product/${id}`;
    //     return axiosClient.put(url, data);
    // },
    // addCard(id){
    //     const url = `/product/${id}?_expand=category`;
    //     return axiosClient.get(url);
    // },
    sameProduct(category){
        const url = `/products/${category}`;
        return axiosClient.get(url);
    }
}

export default ProductApi;