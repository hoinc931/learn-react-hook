import { useLocation } from "react-router-dom";

export const ParseURL = () => {
    const location = useLocation();
    const request = location.pathname.toLowerCase().split('/');
    return request[2];
}
export const ParseURLAdmin = () => {
    const location = useLocation();
    const request = location.pathname.toLowerCase().split('/');
    return request[4];
}