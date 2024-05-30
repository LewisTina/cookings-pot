"use client"

import Link from 'next/link'
import styles from './header.module.scss'
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icons';

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
    
    return (
        <Link href={path} className={`${pathname.includes(path) ? `${styles.active}` : ""} ${styles.navItem}`}>
            {label}
        </Link>
    )
}