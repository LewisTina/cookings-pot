import style from './data_loader.module.scss'

export function DataLoader() {
    return (
        <div className={style.dataLoader}>
            <div className={style.fakeImage}></div>
            <div className={style.fakeData}>
                <div className={style.fakeTitle}></div>
                <div className={style.fakeText}></div>
            </div>
        </div>
    )
}


export function FormDataLoader() {
    return (
        <div className={style.dataLoader}>
            <div className={style.fakeData}>
                <div className={style.fakeTitle}></div>
                <div className={style.fakeText}></div>
            </div>
        </div>
    )
}

export function InlineLoader() {
    return (
        <div className={style.dataLoader}>
            <div className={style.fakeData}>
                <div className={style.fakeText}></div>
            </div>
        </div>
    )
}

export function ImageLoader() {
    return(
        <div className=""></div>
    )
}