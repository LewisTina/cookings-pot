"use client"
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/screen/auth';
import LoginFrom from '@/components/screen/auth/forms/login';

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        const userToken = Cookies.get("credential");
        if (userToken != undefined) {
          router.replace("/account")
        }
      }
    )

    return (
      <AuthLayout bg={'bg-login-cover-bg-3'}>
        <LoginFrom/>
      </AuthLayout>
    )
}