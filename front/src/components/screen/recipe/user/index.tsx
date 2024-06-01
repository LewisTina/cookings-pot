import styles from './user.module.scss'

export default function UserRecipes(props: {data: any}) {
    const { data } = props
    console.log(data)
    return (
        <div className={styles.frame}>
            <h1>Mes Recettes</h1>
        </div>
    )
}