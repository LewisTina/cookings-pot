"use client"
import Icon from "../../Icons"

export interface AlertBannerProps{
    status? : number
    message? : string
    onClose? : () => void
}

interface statusElement {
    theme: string,
    icon: any,
    label: string
}

export default function AlertBanner(props: AlertBannerProps) {
    const {message, status = 0, onClose} = props

    const getStatusElements = () : statusElement => {
        if(status >= 200 && status <= 209) {
            return {theme: "secondary-4", icon: "CheckCircleIcon", label: "Opération réussi"}
        }

        else if(status >= 400 && status <= 499) {
            return {theme: "secondary-3", icon: "InformationCircleIcon", label: "Erreur lors de la requête"}
        }
        
        else if(status >= 500 && status <= 599) {
            return {theme: "secondary-1", icon: "XCircleIcon", label: "Erreur de serveur"}
        }

        else {
            return {theme: "primary-1", icon: "ExclamationCircleIcon", label: "Information"}
        }
    }

    const {theme, icon, label} = getStatusElements()
    
    return (
        <div 
            className={`fixed top-4 right-4 z-[999] flex items-center gap-4 px-4 py-3 rounded-2xl w-[350px] backdrop-blur-xl`}
            style={{
                backgroundColor: `rgba(var(--${theme}), 0.1)`,
                border: `2px solid rgba(var(--${theme}), 0.8)`,
                backgroundImage: 'white',
            }}>
            <div 
                className="text-white w-8 flex items-center justify-center rounded-full aspect-square overflow-hidden"
                style={{
                    backgroundColor: `rgba(var(--${theme}), 1)`,
                }}>
                <Icon name={icon} className="w-6 h-6"/>
            </div>

            <div className="flex flex-1 flex-col">
                <span className="text-base leading-none font-semibold" suppressHydrationWarning>
                    {label}
                </span>
                <div className="text-sm">
                    {message}
                </div>
            </div>

            <button 
                className="
                text-black-1 bg-white-1/50 hover:bg-white-1
                w-7 aspect-square
                flex items-center justify-center 
                rounded-full overflow-hidden"
                onClick={onClose}>
                <Icon name={'XMarkIcon'}/>
            </button>
        </div>
    )
}