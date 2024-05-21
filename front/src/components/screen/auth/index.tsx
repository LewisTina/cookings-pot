import styles from './auth.module.scss'

interface AuthLayoutProps {
    bg: string
}

export default function AuthLayout({ children, bg }: React.PropsWithChildren<AuthLayoutProps>) {

    return (

        <div className={styles.frame}>
            <div className={`${styles.left} ${bg}`}>
            </div>

            <div className={styles.formContent}>
                {children}
            </div>
        </div>
    )
}