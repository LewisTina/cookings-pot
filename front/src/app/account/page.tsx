"use client"
import { useRouter } from "next/navigation";
import { useRecipe } from "@/hooks/recipe";
import { useUser } from "@/hooks/user";
import { useQuery } from "react-query";
import Loader from "@/components/ui/loader";
import Listing from "@/components/blocks/listing";

export default function Account(){
    const { user } = useUser()
    const { getUserRecipes } = useRecipe()
    const { data, isFetching } = useQuery('my_recipes', getUserRecipes, {enabled: !!user})

    return(isFetching ? <Loader/> :<Listing title="Mes recettes" data={data?.data}/>)
}