"use client"
import Header, { FakeHeader } from "@/components/blocks/header";
import Listing from "@/components/blocks/listing";
import { useRecipe } from "@/hooks/recipe";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Recipes() {
    const { getRecipes } = useRecipe()
    const params = useSearchParams()
    const key = params.get("key")
    const { data: _data, isFetching } = useQuery('all_recipes', getRecipes)
    const data: any[] = _data?.data
    const [filteredLibrary, setFilteredLibrary] = useState<any[]|undefined>()

    const handleFilterChange = useCallback((_key: string | number | null) => {
        if(data) {
            const result = data.filter((el) => {
                if (!!_key) {
                    const key = _key.toString().toLowerCase()
                    const elementValues = Object.values(el).map((value: any) => value?.toString().toLowerCase());
                    return elementValues.some((value: any) => value?.includes(key));
                }
                else {
                    return el;
                }
            })
            setFilteredLibrary(result)
        }
    }, [data]);

    useEffect(() => {
        handleFilterChange(key)
    }, [data, handleFilterChange, key])
    
    return (
        <>
        <FakeHeader/>
        <Header/>
        <div className="px-4 py-16 flex w-full">
          <Listing data={filteredLibrary}/>
        </div>
        </>
    )
}