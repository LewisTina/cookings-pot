"use client"
import { useRouter } from "next/navigation";
import { useRecipe } from "@/hooks/recipe";
import { useUser } from "@/hooks/user";
import { useQuery } from "react-query";
import Loader from "@/components/ui/loader";
import UserRecipes from "@/components/screen/recipe/user";

export default function Account(){
    const { user } = useUser()
    const { getUserRecipes } = useRecipe()
    const { data, isFetching } = useQuery('my_recipes', getUserRecipes, {enabled: !!user})
    
    return(isFetching ? <Loader/> :<UserRecipes data={data?.data}/>)
}