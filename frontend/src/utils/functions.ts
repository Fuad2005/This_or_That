import axios from "axios";
import {  setGlobalState } from "@/state/globalState";


export function getUserByToken(token: string) {
    let response
    try{
         axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-profile/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    }).then((res) => {
        setGlobalState("userData", {
            id: res.data.user.id,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            username: res.data.user.username,
            email: res.data.user.email,
            token: token
        });
        response = res
    })
    } catch (error) {
        console.log(error);
    }

    return response
}