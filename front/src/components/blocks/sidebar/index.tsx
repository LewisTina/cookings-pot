import Link from 'next/link'
import Image from 'next/image'
import styles from './sidebar.module.scss'
import { useUser } from '@/hooks/user'
import CustomButton from '@/components/ui/button/CustomButton'
import { useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/outside_click'
import IconButton from '@/components/ui/icon_button'
import { useRouter } from 'next/navigation'
import FakeLogo from '@/components/ui/fakelogo'

export default function SideBar() {
    const { user } = useUser()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => {
        if(isMenuOpen) {
            setIsMenuOpen(false)
        }
    });
    
    return (
        <div className={styles.sideBar}>
            <div className=" flex justify-between items-center">
                <FakeLogo/>
            </div>
            <div className={styles.content}>
                <CustomButton 
                    size="medium"
                    className='!w-full !justify-between'
                    theme='primary'
                    icon="PlusIcon"
                    iconClassName="w-6 h-6"
                    type='button'
                    onClick={()=>{router.push("/account/recipe/new")}} 
                    label={"Créer une recette"}/>
                    <Link href={'/account'} className='rounded-lg px-4 py-2 bg-white-1'>
                        Mes recettes
                    </Link>
            </div>
            <div ref={ref} className="relative -m-4 flex flex-col gap-4">
                <div className={styles.menu}>
                    <CustomButton 
                        size="medium"
                        theme='delete'
                        icon="PencilIcon"
                        iconPosition="left"
                        iconClassName="w-6 h-6"
                        type='button'
                        label={"Modifier les informations"}/>
                    <CustomButton 
                        size="medium"
                        theme='delete'
                        icon="LockClosedIcon"
                        iconPosition="left"
                        iconClassName="w-6 h-6"
                        type='button'
                        label={"Confidentialité"}/>
                    <CustomButton 
                        size="medium"
                        theme='delete'
                        icon="ArrowLeftStartOnRectangleIcon"
                        iconPosition="left"
                        iconClassName="w-6 h-6"
                        type='button'
                        label={"Se déconnecter"}/>
                </div>
                <div className={styles.sideBarFooter} onClick={()=>{setIsMenuOpen(!isMenuOpen)}}>
                    <div className={styles.image}>
                        <Image 
                            src={"/memoji/Memoji-10.png"} 
                            alt={'avatar'}
                            width={44}
                            height={44}/>
                    </div>
                    <div className={styles.informations}>
                        <span>{user?.firstName} {user?.lastName}</span>
                        <span>{user?.email}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}