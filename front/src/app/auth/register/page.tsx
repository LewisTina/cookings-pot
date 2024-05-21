"use client"
import AuthLayout from "@/components/screen/auth";
import RegisterFrom from "@/components/screen/auth/forms/register";

export default function Register() {
    return (
        <AuthLayout bg={'bg-login-cover-bg-2'}>
          <RegisterFrom/>
        </AuthLayout>
    )
}