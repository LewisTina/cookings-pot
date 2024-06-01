"use client"
import UserServices from "../services/UserService";
import useCheckResponse from "./check_response";

export function useIngredient() {
    const { getResponse } = useCheckResponse()

    const createIngredient = (data: any) => 
        UserServices.createRecipe(data).then(async (res: any) => {
            const response = await getResponse(res)
            return response
        })
    
    return {
        createIngredient,
    }
}