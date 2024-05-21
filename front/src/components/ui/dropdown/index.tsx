/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRef, useState } from "react";
import Icon from "../../Icons";
import { useOutsideClick } from "@/src/hooks/outside_click";
import React from "react";
import { SelectItem } from "@/src/types/global";
import styles from './dropdown.module.scss'
import { useI18n } from '@/locales/client';
import DebouncedInput from "../search_bar/debounce_search";

interface DropDownProps {
    label?: string
    size?: "medium" | "small";
    onChange?: (e: any) => void;
    defaultValue?: SelectItem | string | number;
    list: SelectItem[];
    formError?: any;
    asyncSearch?: boolean
    translateValue?: boolean
    className?: string
}

interface insideForm extends DropDownProps {
    name: string
    setValue:  (name: string, value: any) => void
    controller: any
    trigger: any
}

interface simpleDropDown extends DropDownProps {
    setValue?:  (name: string, value: any) => void
    name?: null
    controller?: any
    trigger?: any
}


type Props = insideForm | simpleDropDown

export default function DropDown(props: Props) {
    const t = useI18n();
    const { 
        label, 
        onChange, 
        defaultValue: propsValue, 
        list, 
        formError, 
        name, 
        size, 
        setValue, 
        controller, 
        trigger, 
        translateValue = true,
        className,
        asyncSearch } = props
    const [activeValue, setActiveValue] = useState<undefined | SelectItem>()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const actionnerRef = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => {if(isOpen) setIsOpen(false)});
    const [searchKey, setSearchKey] = useState('')

    const [screenSize, setScreenSize] = React.useState({w: 0,  h: 0})
    const [actionnerRect, setActionnerRect] = React.useState<any>()

    const handleChange = (e: SelectItem) => {
        setActiveValue(e);
        if(onChange) onChange(e);
        if(setValue && name) {
            setValue(name, e.value)
            if(trigger) trigger([name])
        }
        setIsOpen(false)
    }

    React.useEffect(() => {
        const getPosition = () => {   
            const timer = setTimeout(() => {
                const rectElement = actionnerRef?.current?.getBoundingClientRect();

                setScreenSize({
                    w: window.innerWidth, 
                    h: window.innerHeight
                })
        
                if (rectElement) {
                    setActionnerRect({
                        width: rectElement.width,
                        height: rectElement.height, 
                        left: rectElement.left, 
                        right: rectElement.right, 
                        top: rectElement.top,
                        bottom: rectElement.bottom, 
                    })
                }
                
            }, 300)

            return () => {
                clearTimeout(timer)
            }

        }

        if (actionnerRef.current) {
            getPosition();
        }

        const handleResizeAndScroll = () => {
            getPosition();
        };

        window.addEventListener('resize', handleResizeAndScroll);
        window.addEventListener('scroll', handleResizeAndScroll);

        return () => {
            window.removeEventListener('resize', handleResizeAndScroll);
            window.removeEventListener('scroll', handleResizeAndScroll);
        };
    }, []);

    const isOutOfScreenTop = (): string => {
        if((screenSize?.h - actionnerRect?.top) < 384) {
            return 'bottom'
        } else {
            return 'top'
        }
    }

    const menuPosition = isOutOfScreenTop()

    React.useEffect(() => {
        if(propsValue != undefined) {
            if(typeof propsValue == "object") {
                setActiveValue(propsValue)
                handleChange(propsValue)
            } else {
                list.map((e) => {
                    if(e.value == propsValue) {
                        setActiveValue(e);
                    }
                })
            }
        } 

    }, [list, propsValue])

    const filteredData = list.filter((el: any) => {
        if (searchKey === '') {
            return true;
        } else {
            const elementValues = Object.values(el).map((value: any) => {
                if (typeof value === 'object') {
                    return !!value ? Object.values(value).map((value: any) => value?.toString().toLowerCase()) : ""
                } else {
                    return value?.toString().toLowerCase()
                }
            });
            return elementValues.some((value) => {
                if (typeof value === 'object') {
                    return !!value ? value.some((value: any) => value?.includes(searchKey)) : ""
                } else {
                    return value?.includes(searchKey)
                }
            });
        }
    });
    
    return (
        <div className={`w-fit ${size != "small" ? "smd:w-full" : ""} relative ${className ?? ''}`} ref={ref}>
          <div
              {... controller ? controller(name, {required: formError ? true : false}) : null}>
            <div
              ref={actionnerRef}
              tabIndex={0} 
              className={` ${!!size ? styles[size] : styles.medium}
              text-black-1 border-2 border-neutral-3 flex justify-between items-center  cursor-pointer outline-none ${(formError != undefined) && (formError[name!] ? "border-secondary-1 ring-secondary-1/50 ring-offset ring" : "")} ${isOpen ? "ring ring-secondary ring-offset  border-primary-1" : ""}`}
              onClick={()=>{setIsOpen(!isOpen)}}>
                {
                    !!label &&
                    <span className="font-semibold bg-transparent text-black-1 pointer-events-none">
                          {t(label as any, {})} {formError ? "*" : ""}
                    </span>
                }     
                    
                {
                    <div className="flex items-center gap-2">
                        <span className="">
                            {
                                translateValue ? t(activeValue?.label as any, {}) : activeValue?.label!
                            }
                        </span>
                        <Icon name={isOpen ? "ChevronUpIcon" :"ChevronDownIcon"}/>
                    </div>
                }
            </div>
  
            {
              isOpen &&
              <div className={`${styles.menuWrapper} ${styles[menuPosition]} insideScrollBar`}>
                {
                    asyncSearch &&
                    <div className="flex justify-start p-2 sticky top-0 bg-white-1">
                        <DebouncedInput value={''} onChange={value => setSearchKey(value.toString().toLowerCase())}/>
                    </div>
                }
                {
                    filteredData.map((el: SelectItem, idx: number) => {
                    return (
                        <div 
                            key={idx} 
                            className={`p-3 text-sm flex items-center justify-between ${el.value == activeValue?.value ? "bg-primary-1 text-white" : "hover:bg-neutral-1 cursor-pointer"}`} 
                            onClick={() => {handleChange(el)}}>
                            {translateValue ?  t(el.label as any, {}) : el.label}
                        </div>)
                })
                }
              </div>
            }
          </div>
      </div>
    )
}