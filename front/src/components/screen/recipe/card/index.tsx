import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { readBufferImage } from '@/utils';
import styles from './card.module.scss'

export default function RecipeBloc(props: {data: any}) {
    const { data } = props
    const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);
    const cover = data?.images[0]

    useEffect(() => {
        const value = readBufferImage(cover)
        setImageSrc(value)
    }, [cover])

    return(
        <Link href={`recipe/${data._id}`}>
            <div className={styles.frame}>
                <div className={styles.image}>
                    {
                        imageSrc && 
                        <Image 
                            src={imageSrc} 
                            height={500}
                            width={500}
                            className='h-auto w-full rounded-lg'
                            alt={`${data.title} image`}/>
                    }
                </div>
                <h3 className='text-xl font-bold'>{data.title}</h3>
            </div>
        </Link>
    )

}