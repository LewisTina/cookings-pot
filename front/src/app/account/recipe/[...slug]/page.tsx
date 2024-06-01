"use client"
import InputTextField from "@/components/ui/InputTextField";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Recipe(){
    const params = useParams()
    const { register, handleSubmit, formState: {errors} } = useForm();

    /* const {
      data,
      isLoading,
      isSuccess,
      mutateAsync
      } = useMutation() */

    const onSubmit = async (bodyData: any) => {
        //await mutateAsync(bodyData)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col px-3 pb-3 w-full gap-8`}>
            <InputTextField
                placeholder={('Nom de la recette')} 
                controller={register} 
                formError={errors}
                label={"Titre"}
                autoComplete='off'
                name={'title'}/>
        </form>
    )

}