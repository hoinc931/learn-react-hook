import {axiosClient} from './axiosClient';

const ContactAPI = {
    getAll(){
        const url = `/contacts`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/contact/${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/contact/${id}`;
        return axiosClient.delete(url);
    },
    send(content){
        const url = `/contacts`;
        return axiosClient.post(url, content);
    }
}

export default ContactAPI;