import Icon from "@/src/components/Icons"
import { useI18n } from '@/locales/client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LinkItemProps {
    label: string
    path: string
    icon: any
    expanded?: boolean
}

export default function LinkItem(props: LinkItemProps) {
    const {path, label, icon, expanded} = props
    const t = useI18n()
    const pathname = usePathname()
    return (
        <div className={`"full ${expanded ? "" : "tooltip"}`} data-text={t(label as any, {})}>
            <Link 
                className={`flex flex-nowrap gap-4 px-6 py-3 w-full text-sm font-semibold ${pathname.includes(path) ? "bg-neutral-1" : "hover:bg-neutral-1"} text-neutral-6 transition-all duration-300 overflow-hidden truncate`}
                href={path}>
                    <Icon name={icon}/>
                {
                    expanded &&
                    <span>
                        {t(label as any, {})}
                    </span>
                }
            </Link>
        </div>
    )
}