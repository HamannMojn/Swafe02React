export default function authHeader() {
    const user = localStorage.getItem("user");

    return { Authorization: 'Bearer ' + user }
}