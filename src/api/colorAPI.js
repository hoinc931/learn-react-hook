import {axiosClient} from './axiosClient';

const ColorAPI = {
    get(){
        const url = `/colors`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/color/${id}`;
        return axiosClient.delete(url);
    },
    getSize(){
        const url = `/size`;
        return axiosClient.get(url);
    },
    removeSize(id){
        const url = `/size/${id}`;
        return axiosClient.delete(url);
    }
}

export default ColorAPI;