

export default function ColorIndicator(props: React.PropsWithChildren<React.InputHTMLAttributes<HTMLDivElement>>) {
    const { className, ...rest } = props
    return(
        <div className={`w-2.5 min-w-2.5 aspect-square rounded-full ${className ?? ''}`} {...rest}></div>
    )
}