import { useParams, notFound } from 'next/navigation'
import Image from 'next/image';
import { useRecipe } from '@/hooks/recipe'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/loader'
import { ingredientUnit, readBufferImage } from '@/utils'
import styles from './viewer.module.scss'

export default function RecipeViewer() {
    const params = useParams()
    const recipeId = params.id as string
    const { readRecipe } = useRecipe()
    const { data: _data, isFetching } = useQuery(['my_recipes', recipeId], () => readRecipe(recipeId), {enabled: !!recipeId})
    const result = _data?.data;
    const data = result?.recipe;
    const ingredients = result?.ingredients
    const [imageSrc, setImageSrc] = useState<string[]>([]);
    const images = data?.images
    const cover = imageSrc[0]
    const otherImages = imageSrc.slice(1)

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

    useEffect(() => {
        if(!recipeId || (_data?.status && _data?.status !== 200)) {
            notFound()
        }
    }, [_data?.status, recipeId])

    return(
        isFetching ? <Loader/> :
        <div className={styles.frame}>
            <div className={styles.gallery}>
                <div className={styles.cover}>
                    {
                        cover && 
                        <Image 
                            src={cover} 
                            height={500}
                            width={500}
                            className='h-auto w-full rounded-2xl'
                            alt={`${data?.title} image`}/>
                    }
                </div>
                {
                    otherImages.length > 0 &&
                    <div className={styles.grid}>
                        {
                            otherImages.map(((e, idx) => 
                                <Image 
                                    key={idx}
                                    src={e} 
                                    height={500}
                                    width={500}
                                    className='h-auto w-full rounded-2xl'
                                    alt={`${data?.title} image`}/>
                            ))
                        }
                    </div>
                }
            </div>
            <div className={styles.content}>
                <h1>{data.title}</h1>
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
                <h2>{"Etapes"}</h2>
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
            </div>
        </div>
    )
}

export const IngredientCard = (props: {e: any}) => {
    const [isChecked, setIsChecked] = useState(false)
    const {e} = props
    return (
        <div className={`${styles.ingredient} ${isChecked?styles.checked:''}`} key={e._id} onClick={()=>{setIsChecked(!isChecked)}}>
            <div className={styles.image}></div>
            <div className={styles.desc}>
                <span className="font-medium text-xl">{e.quantity} {ingredientUnit[e.unit]}</span> <br/>
                <span>{e.name}</span>
            </div>
        </div>
    )
}