"use client"
import { usePathname, useRouter } from "next/navigation";
import UserServices from "../services/UserService";
import useCheckResponse from "./check_response";
import { useContext } from "react";
import { UserSession } from "../context/user_session";

export function useUser() {
    const router = useRouter();
    const path = usePathname()
    const pagePath = path.replace(`/`, '');
    const { user, setUser} = useContext(UserSession);
    
    const { getResponse } = useCheckResponse()

    const register = (data: any) => 
        UserServices.register(data).then(async (res: any) => {
            const response = await getResponse(res)
            return response
        })
    
    const login = (data: any) => 
        UserServices.login(data).then(async (res: any) => {
            const response = await getResponse(res)
            return response
        });
    
    const authMe = () => 
        UserServices.getUserMe().then(async (res: any) => {
            let data = await res.json();
            if(res.status != 200) {
                if(pagePath != '/' && pagePath != '') {
                    router.replace(`/login?redirect=${pagePath}`)
                } else {
                    router.replace(`/login`)
                }
                return data
            } else {
                setUser(data.data);
                return {data: data, status: res.status}
            }
        })

    return {
        login,
        register,
        authMe,
        user,
    }
}