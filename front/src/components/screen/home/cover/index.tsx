"use client"
import styles from './cover.module.scss'
import Image from 'next/image'
import Icon from '@/components/Icons'
import { useEffect, useState } from 'react'
import IconButton from '@/components/ui/icon_button'
import { FakeHeader } from '@/components/blocks/header'
import { useRecipe } from '@/hooks/recipe'
import { useQuery } from 'react-query'
import { readBufferImage } from '@/utils'
import { IngredientCard } from '../../recipes/viewer'
import Loader from '@/components/ui/loader'
import { useBlockPageScroll } from '@/hooks/block_scroll'
import { useRouter } from 'next/navigation'

export default function Cover() {
    const [expand, setExpanded] = useState(false)
    const { readRecipe } = useRecipe()
    const router = useRouter()
    const { data: _data, isFetching } = useQuery('last_recipes', () => readRecipe("last"))
    const result = _data?.data;
    const data = result?.recipe;
    const ingredients = result?.ingredients
    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const images = data?.images
    const cover = imageSrc[0]
    useBlockPageScroll(expand)

    useEffect(() => {
        if(images)  {
            let base64: string[] = []
            images.map((e: any, idx: number) => {
                const value = readBufferImage(e)
                if(value) base64.push(value)
            })
            setImageSrc(base64)
        }
    }, [images])

    const handleExpand = () => {
        if(expand) {
            setExpanded(!expand)
        } else {
            router.push("#last")
            setExpanded(!expand)
        }
    }

    return (
         isFetching ? <Loader/> :
        <div className={styles.coverFrame} id='last'>
            <FakeHeader/>
            <div className={`${styles.lastAdd} ${expand ? styles.expand : ''}`}>
                <div className={styles.left}>
                    <div className={styles.intro}>
                        <h1>{"Recette de la semaine"}</h1>
                        
                        <div className={styles.rate}>
                            <Icon name={'StarIcon'}/>
                            <Icon name={'StarIcon'}/>
                            <Icon name={'StarIcon'}/>
                            <Icon name={'StarIcon'}/>
                            <Icon name={'StarIcon'} type='outline'/>
                        </div>
                        <span className="text-sm">
                            {data.description}
                        </span>
                    </div>
                    {
                        cover &&
                        <div className={styles.imageWrapper} onClick={handleExpand}>
                            <Image 
                                src={cover} 
                                alt={'Image de la recette de la semaine'}
                                className={styles.image}
                                fill/>
                        </div>
                    }

                    <IconButton 
                        icon='XMarkIcon' 
                        className={styles.floatingButton}
                        onClick={() => {setExpanded(false)}}/>
                </div>
                <div className={styles.right}>
                    <h2>{data.title}</h2>
                    {
                        !expand ?
                        <div className={styles.button} onClick={handleExpand}>Voir la recette</div>
                        : 
                        <>
                            <p className={styles.description}>
                                {data.description}
                            </p>
                            <h2>{"Ingredients"}</h2>
                                {
                                    ingredients?.length > 0 &&
                                    <div className={styles.ingredientsList}>
                                        {ingredients.map((e: any) => {
                                            return(
                                                <IngredientCard key={e._id} e={e}/>
                                            )
                                        })}
                                    </div>
                                }
                            <h2>{"Préparation"}</h2>
                            {
                                    data?.steps?.length > 0 &&
                                    <div className={styles.ingredientsList}>
                                        {data.steps.map((e: any, idx: number) => {
                                            return(
                                                <div className="" key={idx}>
                                                    <h3 className="text-xl font-medium">{`Etape ${idx + 1}`}</h3>
                                                    <p className={styles.description}>
                                                        {e}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}