import axios from "axios";
import {  setGlobalState } from "@/state/globalState";


export async function getUserByToken(token: string) {
    try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-profile/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    setGlobalState("userData", {
            id: res.data.user.id,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            username: res.data.user.username,
            email: res.data.user.email,
            token: token
        });
        return res

    } catch (error) {
        console.log(error);
        return null
    }

}


export function resetGlobalUserData() {
    localStorage.removeItem("token")
    setGlobalState("userData", {
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        token: '',
    });
}