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
    const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);
    const cover = data?.images[0]

    useEffect(() => {
        const value = readBufferImage(cover)
        setImageSrc(value)
    }, [cover])

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
                        imageSrc && 
                        <Image 
                            src={imageSrc} 
                            height={500}
                            width={500}
                            className='h-auto w-full rounded-2xl'
                            alt={`${data?.title} image`}/>
                    }
                </div>
                <div className={styles.grid}></div>
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
                                console.log(e)
                                return(
                                    <IngredientCard key={e._id} e={e}/>
                                )
                            })}
                        </div>
                    }
                <h2>{"Etapes"}</h2>
            </div>
        </div>
    )
}

const IngredientCard = (props: {e: any}) => {
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