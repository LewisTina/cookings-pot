import Link from 'next/link'
import Icon from '../../Icons'

interface LinkButton {
    label: string
    path: string
    color?: string
}

export default function LinkButton(props: LinkButton) {
    const {path, label, color} = props
    return (
        <Link 
            className={`
            flex gap-8
            px-4 py-1
            rounded-full
            items-center justify-center
            w-fit
            text-sm font-medium
            ${color ?? 'bg-primary-1/10 hover:bg-primary-1/30 text-primary-1'}
            `}
            href={path}>
            {label}
            <div className="overflow-hidden flex items-center justify-center h-5">
                <Icon name={'ChevronRightIcon'}/>
            </div>
        </Link>
    )
}