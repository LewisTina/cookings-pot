import { useUser } from '@/hooks/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import InputTextField from '@/components/ui/InputTextField';
import CustomButton from '@/components/ui/button/CustomButton';
import LinkButton from '@/components/ui/LinkButton';
import styles from '../auth.module.scss'

export default function RegisterFrom() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter()
    const searchParams = useSearchParams()
    const previousRouter = searchParams.get('redirect')
    const { register: registerMember } = useUser()

    const {
      data,
      isLoading,
      isSuccess,
      mutateAsync
      } = useMutation(registerMember)

    const onSubmit = async (bodyData: any) => {
        await mutateAsync(bodyData)
    }

    useEffect(() => {
        if (isSuccess) {
            if (data.status == 201) {
                Cookies.set('credential', data.data.token);
                setTimeout(() => {
                    if(!!previousRouter){
                        router.replace(previousRouter)
                    }

                    else{
                        router.replace("/account")
                    }
                }, 1000)
            }
        }
    }, [isSuccess, data, previousRouter, router])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>
                {"Rejoignez l'aventure\nCooking Pot's"}
            </h1>
            <div className={styles.fields}>
                <InputTextField
                    label={"Adresse email"}
                    placeholder={"Votre adresse e-mail"}
                    controller={register} 
                    formError={errors}
                    autoComplete='email'
                    name={'email'}/>
                <InputTextField
                    label={"Prénom"}
                    placeholder={"Votre prénom"}
                    controller={register} 
                    formError={errors}
                    autoComplete='first_name'
                    name={'firstName'}/>
                <InputTextField
                    label={"Nom"}
                    placeholder={"Votre nom"}
                    controller={register} 
                    formError={errors}
                    autoComplete='last_name'
                    name={'lastName'}/>
                <InputTextField
                    label={'Mot de passe'}
                    placeholder={'***************'} 
                    controller={register} 
                    formError={errors}
                    type='password'
                    autoComplete='current-password'
                    name={'password'}/>
            </div>

            <CustomButton 
                type='submit'
                theme='primary'
                size='full'
                isLoading={isLoading}
                label={'Terminer'}/>

            <div className="flex gap-2">
                <span>{"Déjà membre ?"}&nbsp;</span>
                <LinkButton 
                    label={'Connectez vous'} 
                    path={'/auth/login'}/>
            </div>
        </form>
    )
}