import axios from "axios";
import { User } from "../Models/User";

const URL = "https://afe2021fitness.azurewebsites.net/api/Users/";

class AuthService {
    login(email: string, password: string){
        return axios
        .post(URL + "login", {
            email, password
        })
        .then((response) => {
            if(response.data.jwt) {
                sessionStorage.setItem("user", JSON.stringify(response.data))
            }
            
            return response.data
        });
    }

    logout(){
        sessionStorage.removeItem("user");
    }

    register(user: User){
        return axios.post(URL, user);
    }

    getCurrentUser() {
        const user = sessionStorage.getItem("user");
        if(user){
            return JSON.parse(user)
        }
        return null;
    }
}
export default new AuthService();

    