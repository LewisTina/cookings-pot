import Icon from "@/src/components/Icons";
import { useOutsideClick } from "@/src/hooks/outside_click";
import { useRef, useState } from "react";
import styles from './user_menu.module.scss'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import SwitchTheme, { getIcon } from "@/src/components/block/switch_theme";
import MenuButton from "../../menu_button";
import SwitchLang from "@/src/components/block/switch_lang";
import { useUser } from "@/src/hooks/user";
import { useQuery } from "react-query";

export default function UserMenu(props: {expanded: boolean}) {
    const {expanded} = props
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { user } = useUser()

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => {if(isOpen) setIsOpen(false)});

    function log_out() {
        Cookies.remove("user_credential")
        router.replace ("/")
    }
    
    return (
        <div className="flex w-full border-neutral-3" ref={ref}>
            <div className={`${expanded ? "mx-4 mb-4 rounded-2xl border-2" : "border-t-2"} ${isOpen ? "bg-neutral-3 border-neutral-2" : "bg-neutral-2 hover:bg-neutral-3 hover:border-neutral-2 border-neutral-3"} p-3 w-full flex items-center gap-4 transition-colors duration-300 cursor-pointer`} onClick={()=>{setIsOpen(!isOpen)}}>
                <div className="flex rounded-full bg-neutral-3 p-2 text-primary-1">
                    <Icon name={"UserIcon"} className="h-7 w-7"/>
                </div>
                
                <div className={`font-bold truncate ${expanded ? "block" : "hidden"}`}>
                    {user?.first_name} {user?.name}
                    <div className="font-medium text-sm text-neutral-5">
                        @{user?.username}
                    </div>
                </div>
            </div>

            {
                isOpen &&
                <div className={styles.menuFrame}>
                    <div className="flex items-center gap-4 p-3">
                        <div className="flex rounded-full bg-neutral-3 p-2 text-primary-1">
                            <Icon name={"UserIcon"} className="h-7 w-7"/>
                        </div>
                        
                        <div className={`font-bold truncate`}>
                            {user?.first_name} {user?.name}
                            <div className="font-medium text-sm text-neutral-5">
                                @{user?.username}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <SwitchTheme/>
                        <SwitchLang/>
                    </div>

                    <div className="">
                        <MenuButton 
                            icon={"ArrowLeftOnRectangleIcon"} 
                            label={"log_out"} 
                            onClick={()=> log_out()}
                            className="hover:!bg-secondary-1/25 hover:!text-secondary-1"/>
                    </div>
                </div>
            }
        </div>
    )
}