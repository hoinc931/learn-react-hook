import {axiosClient} from './axiosClient';

const AuthApi = {
    signUp(signUp){
        const url = '/signup';
        return axiosClient.post(url, signUp)
    },
    signIn(signInData){
        const url = '/signin';
        return axiosClient.post(url, signInData)
    },
    signOut(){
        const url = '/signout';
        return axiosClient.get(url);
    },
    getList(){
        const url = '/listuser';
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/removeuser/${id}`;
        return axiosClient.delete(url)
    },
    getUser(id){
        const url = `/getuserbyid/${id}`;
        return axiosClient.get(url)
    }
}

export default AuthApi;