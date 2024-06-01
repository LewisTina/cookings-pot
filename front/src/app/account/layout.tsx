"use client"
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { useUser } from "@/hooks/user";
import Loader from "@/components/ui/loader";
import SideBar from "@/components/blocks/sidebar";

interface AccountLayoutProps {
    children: React.ReactNode;
  }

export default function AccountLayout({children}: AccountLayoutProps){
    const router = useRouter()
    const { authMe, user } = useUser()
    const { isFetching } = useQuery('user', authMe, {enabled: user == null})

    useEffect(() => {
        const userToken = Cookies.get("credential");
        if (!userToken) {
          router.replace("/auth/login?redirect=/account")
        }
      }
    )

    if(isFetching) {
        return (
          <Loader/>
        )
    } else if(user) {
        return(
            <div className="flex w-full">
                <SideBar/>
                <div className="flex flex-col flex-1 p-8 h-fit min-h-screen">
                    {children}
                </div>
            </div>
        )
    }
}