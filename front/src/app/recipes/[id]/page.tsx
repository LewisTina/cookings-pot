"use client"
import Header, { FakeHeader } from "@/components/blocks/header";
import RecipeViewer from "@/components/screen/recipes/viewer";

export default function Recipe(){
    return(
        <>
            <FakeHeader/>
            <Header/>
            <RecipeViewer/>
        </>
    )
}