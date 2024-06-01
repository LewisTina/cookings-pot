"use client"
import Header, { FakeHeader } from "@/components/blocks/header";
import RecipeViewer from "@/components/screen/recipe/viewer";

export default function Recipe(){
    return(
        <>
            <FakeHeader/>
            <Header/>
            <RecipeViewer/>
        </>
    )
}