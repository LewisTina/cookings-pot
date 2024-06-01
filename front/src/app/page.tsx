"use client"
import Header from "@/components/blocks/header";
import Listing from "@/components/blocks/listing";
import Cover from "@/components/screen/home/cover";
import { useRecipe } from "@/hooks/recipe";
import { useQuery } from "react-query";

export default function Home() {
  const { getRecipes } = useRecipe()
  const { data, isFetching } = useQuery('all_recipes', getRecipes)
  
  return (
    <div className="w-full">
      <Cover/>
      <Header/>
      <div className="px-4 py-16 flex w-full">
        <Listing data={data?.data}/>
      </div>
    </div>
  );
}
