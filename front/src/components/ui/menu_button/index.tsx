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

    return(
        <button className={`${styles.menuButton} ${active ? styles.active : ''} ${className ?? ''}`} onClick={onClick}>
            {
                icon &&
                <Icon name={icon}/>
            }
            <span> {label} </span>
        </button>
    )
}

export default MenuButton