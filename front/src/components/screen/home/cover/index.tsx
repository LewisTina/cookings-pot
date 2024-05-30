"use client"
import CustomButton from '@/components/ui/button/CustomButton'
import styles from './cover.module.scss'
import Image from 'next/image'
import Icon from '@/components/Icons'
import { useState } from 'react'
import IconButton from '@/components/ui/icon_button'

export default function Cover() {
    const imageUrl = '/3215.jpg'
    const [expand, setExpanded] = useState(false)

    return (
        <div className={styles.coverFrame}>
            <div className={styles.fakeHeader}>
                <span></span>

                <span className={styles.fakeLogo}>
                    {"Cooking"} <b>{"Pot's"}</b>
                </span>

                <CustomButton 
                    size='medium'
                    theme='primary'
                    icon='UserIcon'
                    iconPosition='left'
                    label={'Mon compte'}/>
            </div>
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam enim asperiores blanditiis repellat beatae ipsam quis, expedita quas labore alias cumque dolorem iure voluptatum nulla soluta maxime. Labore, quam corporis?
                        </span>
                    </div>
                    <div className={styles.imageWrapper} onClick={() => {setExpanded(!expand)}}>
                        <Image 
                            src={imageUrl} 
                            alt={'Image de la recette de la semaine'}
                            className={styles.image}
                            fill/>
                    </div>

                    <IconButton 
                        icon='XMarkIcon' 
                        className={styles.floatingButton}
                        onClick={() => {setExpanded(false)}}/>
                </div>
                <div className={styles.right}>
                    <h2>{"Lorem ipsum dolor sit amet, consectetur adipisicing elit."}</h2>
                    {
                        !expand && 
                        <div className={styles.button} onClick={() => {setExpanded(true)}}>Voir la recette</div>
                    }
                </div>
            </div>
        </div>
    )
}