import axios from "axios";
import { User } from "../Models/User";
import jwt from 'jwt-decode';
import { userInfo } from "../Models/userInfo";

const URL = "https://afe2021fitness.azurewebsites.net/api/Users/";

class AuthService {
    async login(email: string, password: string){
        return await axios
        .post(URL + "login", {
            email, password
        })
        .then((response) => {
            const token = response.data.jwt;
            if(token) {
                localStorage.setItem("user", token);
                const info = jwt<string>(token);
                localStorage.setItem("info", JSON.stringify(info));
            }

            
            return token
        });
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("info");
    }

    register(user: User){
        return axios.post(URL, user);
    }

    getCurrentUser(){
        const info = <userInfo>JSON.parse(localStorage.getItem("info")!);
        console.log(info);
        return info;
    }
}
export default new AuthService();

    