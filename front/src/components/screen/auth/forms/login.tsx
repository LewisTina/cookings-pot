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
import Link from 'next/link';

export default function LoginFrom() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const router = useRouter()
    const searchParams = useSearchParams()
    const previousRouter = searchParams.get('redirect')
    const { login } = useUser()

    const {
      data,
      isLoading,
      isSuccess,
      mutateAsync
      } = useMutation(login)

    const onSubmit = async (bodyData: any) => {
        await mutateAsync(bodyData)
    }

    useEffect(() => {
        if (isSuccess) {
            if (data.status == 200) {
                Cookies.set('user_credential', data.data.token.access_token);
                setTimeout(() => {
                    if(!!previousRouter){
                        router.replace(previousRouter)
                    }

                    else{
                        router.replace("/")
                    }
                }, 1000)
            }
        }
    }, [isSuccess, data, previousRouter, router])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>
                {"Connectez vous"}
            </h1>
            <div className={styles.fields}>
                <InputTextField
                    label={"Nom d'utilisateur ou email"}
                    placeholder={"Rentrez votre identifiant de connexion"}
                    controller={register} 
                    formError={errors}
                    autoComplete='username'
                    name={'login'}/>
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
                label={'Se connecter'}/>

            <div className="flex gap-2">
                <span>{"Nouveau chez nous ?"}&nbsp;</span>
                <LinkButton 
                    label={'Créer un compte'} 
                    path={'/auth/register'}/>
            </div>
            
            <Link href='/auth/register' className='font-medium underline'>Mot de passe oublié</Link>
        </form>
    )
}