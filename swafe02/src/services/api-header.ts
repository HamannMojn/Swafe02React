import axios from "axios";

export default function authHeader() {
    const userStr = sessionStorage.getItem("user");
    let user = null;
    if(userStr){
        user = JSON.parse(userStr);
    }
    return { Authorization: 'Bearer ' + user.jwt }
}