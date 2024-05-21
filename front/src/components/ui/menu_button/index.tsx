import { useI18n , defineLocale} from '@/locales/client'
import Icon from "../../Icons"
import styles from './menu_button.module.scss'

const MenuButton = (props: {
    icon?: string, 
    label: string, 
    onClick?: () => void, 
    className?: string,
    active?: boolean
}) => {
    const {icon, label, className, onClick, active} = props
    const t = useI18n()

    return(
        <button className={`${styles.menuButton} ${active ? styles.active : ''} ${className ?? ''}`} onClick={onClick}>
            {
                icon &&
                <Icon name={icon}/>
            }
            <span> {t(label as any, {})} </span>
        </button>
    )
}

export default MenuButton