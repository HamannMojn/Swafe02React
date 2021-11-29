import axios from "axios";
import { User } from "../Models/User";
import jwt from 'jwt-decode';
import { userInfo } from "../Models/userInfo";

const URL = "https://afe2021fitness.azurewebsites.net/api/Users/";

class AuthService {
    login(email: string, password: string){
        return axios
        .post(URL + "login", {
            email, password
        })
        .then((response) => {
            const token = response.data.jwt;
            if(token) {
                sessionStorage.setItem("user", token);
                const info = jwt<string>(token);
                sessionStorage.setItem("info", JSON.stringify(info));
            }

            
            return token
        });
    }

    logout(){
        sessionStorage.removeItem("user");
    }

    register(user: User){
        return axios.post(URL, user);
    }

    getCurrentUser(){
        const info = <userInfo>JSON.parse(sessionStorage.getItem("info")!);
        return info;
    }
}
export default new AuthService();

    