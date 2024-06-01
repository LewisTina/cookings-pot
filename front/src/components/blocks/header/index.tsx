"use client"
import Link from 'next/link'
import styles from './header.module.scss'
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icons';
import FakeLogo from '@/components/ui/fakelogo';
import CustomButton from '@/components/ui/button/CustomButton';

interface NavItemProps {
    path: string;
    label: string;
}

export default function Header() {
    return (
        <header className={styles.headerFrame}>
            <div className={styles.headerContent}>
                <div className={styles.searchBar}>
                    <Icon 
                        className='w-5 h-5'
                        name={'MagnifyingGlassIcon'}/>
                    <input type="search" className={styles.input} placeholder='Recherchez une recette...'/>
                </div>
                <div className={styles.menuContent}>
                    <NavItem path={'/'} label={'Accueil'}/>
                    <NavItem path={'/recipe'} label={'Recettes'}/>
                    <NavItem path={'/blog'} label={'Blog'}/>
                </div>
            </div>
        </header>
    )
}

function NavItem(props: NavItemProps) {
    const {path, label} = props
    const pathname = usePathname();
    const pathUrl = pathname.split('/')[1]
    
    return (
        <Link href={path} className={`${`/${pathUrl}` == path ? `${styles.active}` : ""} ${styles.navItem}`}>
            {label}
        </Link>
    )
}

export function FakeHeader()  {
    const router = useRouter()

    return (
        <div className={styles.fakeHeader}>
            <span></span>                
            <FakeLogo/>
            <CustomButton 
                size='medium'
                theme='primary'
                icon='UserIcon'
                onClick={()=> {router.push('/account')}}
                iconPosition='left'
                className='ml-auto'
                label={'Mon compte'}/>
        </div>
    )
}