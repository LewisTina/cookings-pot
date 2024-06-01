import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './card.module.scss'

export default function RecipeBloc(props: {data: any}) {
    const { data } = props
    const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);
    const cover = data?.images[0]
    

    useEffect(() => {
        const base64String = cover ? Buffer.from(cover).toString('base64') : undefined;
        const stringValues = base64String?.split("9j/")
        console.log(base64String)
        if(stringValues && stringValues.length > 1) {
            const _val = stringValues[1]
            const dataUrl = `data:image/png;base64,${_val}`;
            setImageSrc(dataUrl)
        }
    }, [cover])

    return(
        <div className={styles.frame}>
            <div className={styles.image}>
                {
                    imageSrc && 
                    <Image 
                        src={imageSrc} 
                        height={500}
                        width={500}
                        className='h-auto w-full'
                        alt={`${data.title} image`}/>
                }
            </div>
            <h3 className='text-xl font-bold'>{data.title}</h3>
        </div>
    )

}