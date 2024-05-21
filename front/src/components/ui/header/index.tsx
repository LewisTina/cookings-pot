export default function Header(props: {title: string}) {
    const {title} = props
    return (
        <div className={`px-8 py-12 mdd:py-4 mdd:pl-16 mdd:pr-4 mdd:sticky mdd:top-0 w-full bg-neutral-0 border-neutral-3 border-b-2`}>
            <h1 className="text-4xl smd:text-2xl md:text-3xl font-bold mdd:truncate">
                Monitoring - {title}
            </h1>
        </div>
    )
}