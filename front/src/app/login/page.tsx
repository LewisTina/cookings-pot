"use client"
import Image from 'next/image'
import InputTextField from '@/components/ui/InputTextField';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/ui/button/CustomButton';
import LinkButton from '@/components/ui/LinkButton';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/hooks/user';

export default function Login() {
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
        const userToken = Cookies.get("user_credential");
        if (userToken != undefined) {
          router.replace("/")
        }
      }
    )


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
        <div className={`w-full pr-16 pt-16 flex flex-col items-center min-h-[100dvh] h-full bg-neutral-2 overflow-auto mdd:h-[unset] mdd:pr-0 mdd:pt-0 mdd:min-h-[unset] mdd:overflow-visible`}>
            <div className="flex w-full max-w-6xl justify-end mt-auto mdd:flex-col">
                <div className="fixed mdd:relative -z-1 w-[60vw] mdd:w-full h-[100dvh] mdd:h-[unset] mdd:aspect-[2/1] left-0 top-0 bg-login-cover-bg bg-no-repeat bg-[length:150%] mdd:bg-[length:120%] bg-bottom">
                </div>

                <div className="z-0 flex flex-col p-20 smd:py-20 smd:px-4 smd:w-full md:w-fit md:mx-auto gap-12 bg-white-1 border-x border-t border-neutral-3 rounded-t-2xl">
                    <Image
                        src="/logo_dark.svg"
                        alt="JobM Logo"
                        className='mdd:mx-auto'
                        width={100}
                        height={100}
                        priority />

                    <h3 className="capitalize text-[2.5rem] font-bold text-neutral-5 mdd:text-center">
                        {"Se connecter"}
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col justify-start gap-8 md:mx-auto`}>
                        <div className="flex flex-col gap-4">
                            <InputTextField
                                label={'username'}
                                placeholder={'username_placeholder'} 
                                controller={register} 
                                formError={errors}
                                autoComplete='username'
                                name={'login'}/>
                            <InputTextField
                                label={'password'}
                                placeholder={'password_placeholder'} 
                                controller={register} 
                                formError={errors}
                                type='password'
                                autoComplete='current-password'
                                name={'password'}/>
                        </div>
                        <CustomButton 
                            type='submit'
                            isLoading={isLoading}
                            label={'login'}/>
                        <LinkButton 
                            label={'reset_password'} 
                            path={'/'}/>
                    </form>
                </div>
            </div>
        </div>
    )
}