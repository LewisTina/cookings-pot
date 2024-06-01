import RecipeBloc from '../../screen/recipes/card'
import styles from './listing.module.scss'

export default function listing(props: {data: any, title?: string}) {
    const { data, title } = props
    
    return (
        <div className={styles.frame}>
            {
                !!title &&
                <h1>{title}</h1>
            }

            <div className={styles.listing}>
                {
                    data ?
                    data.map((e: any) => <RecipeBloc data={e} key={e._id}/>)
                    : null
                }
            </div>
        </div>
    )
}