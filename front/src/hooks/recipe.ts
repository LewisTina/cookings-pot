"use client"
import UserServices from "../services/UserService";
import useCheckResponse from "./check_response";

export function useRecipe() {
    const { getResponse } = useCheckResponse()

    const createRecipe = (data: any) => 
        UserServices.createRecipe(data).then(async (res: any) => {
            const response = await getResponse(res)
            return response
        })

    const getUserRecipes = () => 
        UserServices.getUserRecipes().then(async (res: any) => {
            const response = await getResponse(res)
            return response
        })
    
    return {
        createRecipe,
        getUserRecipes,
    }
}