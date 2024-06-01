import Link from "next/link";
import styles from './fakelogo.module.scss'

export default function FakeLogo() {
    return (
        <Link href={"/"}>
            <span className={styles.fakeLogo}>
                {"Cooking"} <b>{"Pot's"}</b>
            </span>
        </Link>
    )
}