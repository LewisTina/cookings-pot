import Link from "next/link";
import styles from './fakelogo.module.scss'

export default function FakeLogo() {
    return (
        <Link href={"/"} className={styles.fakeLogo}>
            {"Cooking"} <span>{"Pot's"}</span>
        </Link>
    )
}