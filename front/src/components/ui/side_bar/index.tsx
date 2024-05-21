/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import LinkItem from "./link_item";
import Icon from "../../Icons";
import UserMenu from "./user_menu";
import styles from './side_bar.module.scss'
import { useOutsideClick } from "@/src/hooks/outside_click";

export default function SideBar(props: {}) {
    const [expanded, SetExpanded] = useState(false)
    const [isSmall, SetIsSmall] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => {if(expanded && isSmall) {
      SetExpanded(false)
      localStorage.setItem("expandSideBar", "false");
    }});

    const findExpanded = () => {
      const localStorage = window.localStorage;
      const savedExpendLocal = localStorage.getItem("expandSideBar");

      if (!!savedExpendLocal) {
        SetExpanded(savedExpendLocal == "true");
      } else {
        handleChangeExpand()
      }
    }

    useEffect(() => {
      findExpanded()
    }, []);

    const handleChangeExpand = () => {
      SetExpanded(!expanded)
      localStorage.setItem("expandSideBar", (!expanded).toString());
    }

    const matchesSize = (value: boolean) => {
      if(value) {
          if(!isSmall) SetIsSmall(true)
        } else {
          if(isSmall) SetIsSmall(false)
        }

    }

    useEffect(() => {
      const result = window.matchMedia("(max-width: 1023px)");
      matchesSize(result.matches)
      
      result.addEventListener("change", (e) => {
        const _matches = e.matches
        matchesSize(_matches)
      })
    })

    return (
        <div className={`${expanded ? styles.expanded : styles.retracted} ${styles.frame} ${isSmall ? styles.small : styles.medium}`} ref={ref}>
            <div className="flex flex-col gap-8 py-3">
              <button 
                className={`${styles.expandButton}`}
                onClick={handleChangeExpand}>
                <Icon name={expanded ? `${isSmall ? "XMarkIcon" : "ArrowLeftCircleIcon"}` : `${isSmall ? "Bars3Icon" : "ArrowRightCircleIcon"}`} className="h-6 w-6"/>
              </button>
              <div className={`flex flex-col gap-16 ${styles.content}`}>
                  <div className={`flex ${expanded ? "px-6 w-full" : "p-0 mx-auto"}`}>
                      <Image
                          src={expanded ? "/logo_extend_light.svg" : "/logo_light.svg"}
                          alt="JobM Logo"
                          width={expanded ? 86 : 28}
                          height={32}
                          priority />
                  </div>

                  <div className="w-full flex flex-col">
                      <LinkItem expanded={expanded} label={"dashboard"} path={"/dashboard"} icon={"HomeIcon"}/>
                      <LinkItem expanded={expanded} label={"events"} path={"/events"} icon={"BellAlertIcon"}/>
                      <LinkItem expanded={expanded} label={"conditions"} path={"/conditions"} icon={"Square3Stack3DIcon"}/>
                      <LinkItem expanded={expanded} label={"rule"} path={"/rules"} icon={"QueueListIcon"}/>
                      <LinkItem expanded={expanded} label={"actions"} path={"/actions"} icon={"ArrowsUpDownIcon"}/>
                      <LinkItem expanded={expanded} label={"users"} path={"/users"} icon={"UserGroupIcon"}/>
                      <LinkItem expanded={expanded} label={"ivanti"} path={"/ivanti"} icon={"PaperAirplaneIcon"}/>
                      {/* <LinkItem expanded={expanded} label={"exceptions"} path={"/exceptions"} icon={"PauseCircleIcon"}/> */}
                  </div>
              </div>
            </div>

            <div className={styles.userMenu}>
              <UserMenu expanded={expanded}/>
            </div>
        </div>
    )
}