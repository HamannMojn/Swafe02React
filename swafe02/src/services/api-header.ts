import axios from "axios";

export default function authHeader() {
    const user = sessionStorage.getItem("user");

    return { Authorization: 'Bearer ' + user }
}