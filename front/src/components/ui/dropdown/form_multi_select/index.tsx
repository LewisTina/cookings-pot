/* eslint-disable react-hooks/exhaustive-deps */
import { useI18n } from '@/locales/client';
import { useEffect, useRef, useState } from "react";
import Icon from "../../../Icons";
import styles from '../dropdown.module.scss'
import { useOutsideClick } from "@/src/hooks/outside_click";
import CustomButton from "../../button/CustomButton";
import IconButton from "../../icon_button";
import { SelectItem } from "@/src/types/global";

interface MultiSelectProps {
    id?: string,
    list: SelectItem[];
    defaultValue?: SelectItem[] | string[] | number[];
    formError?: any
    label:   string;
}

interface insideForm extends MultiSelectProps {
  name: string
  setValue:  (name: string, value: any) => void
  controller: any
  trigger: any
}

interface simpleDropDown extends MultiSelectProps {
  setValue?:  (name: string, value: any) => void
  name?: null
  controller?: any
  trigger?: any
}


type Props = insideForm | simpleDropDown

export default function FormMultiSelect(props: Props)  {
    const t = useI18n();
    const [isOpen, setIsOpen] = useState(false)
    const [finalList, setFinalList] = useState<any[]>([]);
    const allSelected = finalList.every(day => day.selected === true);

    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => {if(isOpen) setIsOpen(false)});
    const { label, list, formError, name, setValue, controller, trigger, defaultValue } = props

    const getItem = (value: string|number): any => {
      let result
      list?.map((el: any, idx) => {
        if(el.value == value) {
          result = {data: el, id: idx}
        }
      })
      return result
    }

    useEffect(()=>{
      let parsedList: any = []

      list?.map((el: any ) => {
        parsedList.push({label: t(el.label  as any, {}), value: el.value, selected: false})
      })

      if(!!defaultValue) {
        defaultValue?.map((e: any) => {
          if(typeof e == "object") {
          } else {
            const item = getItem(e)
            if(!!item) {
              const idx = item.id
              const updatedList = [...parsedList];
              updatedList[idx] = { ...updatedList[idx], selected: true };
              parsedList = updatedList
            }
          }
        });
      }

      setFinalList(parsedList)
    }, [list])

    useEffect(()=>{
      if(finalList.length > 0 && !!defaultValue) {
        defaultValue?.map((e: any, idx: number) => {
          if(typeof e == "object") {
          } else {
            const item = getItem(e)
          }
        });
      }
    }, [])

    const valueSetter = (idx: number) => {
      const updatedList = [...finalList];
      const selected = updatedList[idx].selected
      updatedList[idx] = { ...updatedList[idx], selected: !selected };
      setFinalList(updatedList);
    }

    const selectOrUnselectAll = () => {
      const updatedList = [...finalList];
      finalList?.map((el: any, idx: number) => {
        if(allSelected) {
          updatedList[idx] = { ...updatedList[idx], selected: false };
        } else {
          updatedList[idx] = { ...updatedList[idx], selected: true };
        }
      });

      setFinalList(updatedList);
    }

    useEffect(() => {
      const selected = finalList.filter((el: any) => {
        return el.selected == true;
      })
      const list: any = []
        selected?.map((el: any) => {
          list.push(el.value)
        })
        if(setValue && name) {
            if(list.length > 0) {
              setValue(name, list)
            } else {
              setValue(name, undefined)
            }
            
            if(formError) {
              if(trigger && Object.keys(formError).length > 0) trigger([name])
            }
        }
    }, [finalList])

    /* useEffect(() => {
      if(!!defaultValue) {
        defaultValue?.map((el: any, idx: number) => {
          if(typeof el == "object") {
          } else {
            finalList.map((e, idx) => {
                if(e.value == el) {
                  valueSetter(idx)
                }
            })
          }
        });
      } 

    }, [list, defaultValue]) */
    
    return (
      <div className="w-96 smd:w-full relative">
        <div ref={ref}>
          <div 
            {... controller ? controller(name, {required: formError ? true : false}) : null}
            className={`flex w-full justify-between items-center py-3 px-4 bg-transparent text-black-1 border-2 border-neutral-3 transition-all rounded-xl mb-2 cursor-pointer outline-none ${(formError != undefined) && (formError[name!] ? "border-secondary-1 ring-secondary-1/50 ring-offset ring" : "")} ${isOpen ? "ring ring-secondary ring-offset  border-primary-1" : ""}`}
            onClick={()=>{setIsOpen(!isOpen)}}>
                      
              <span className="font-semibold bg-transparent text-black-1 pointer-events-none">
                    {t(label as any, {})} {formError ? "*" : ""}
              </span>
                  
              <Icon name={isOpen ? "ChevronUpIcon" :"ChevronDownIcon"}/>
          </div>

          {
            isOpen &&
            <div className={`${styles.menuWrapper} insideScrollBar`}>
              {
                  finalList.map((el: any, idx: number) => {
                  return (
                      <div 
                          key={idx} 
                          className={`text-sm flex items-center justify-between ${el.selected ? "bg-neutral-2 text-neutral-5 pl-3 py-1 pr-1" : "hover:bg-neutral-1 cursor-pointer p-3"}`} 
                          onClick={() => {valueSetter(idx)}}>
                          {el.label}

                          {
                            el.selected &&
                            <IconButton 
                              icon={"XMarkIcon"} 
                              size="small"
                              className="bg-neutral-1 text-black-1 hover:bg-neutral-3 p-2.5"/>
                          }
                      </div>)
              })
              }

              <div className="flex justify-end p-2 sticky bottom-0bg-white-1">
                <CustomButton 
                    type='button'
                    size="small"
                    icon={allSelected ? "XCircleIcon"  : "PlusCircleIcon"}
                    iconPosition="left"
                    theme="custom"
                    iconClassName="w-6 h-6"
                    className={`text-white ${allSelected ? "bg-black-1" : " bg-primary-1"}`}
                    onClick={()=> {selectOrUnselectAll()}}
                    label={t(allSelected ? 'unselect_all' : 'select_all'  as any, {})}/>
              </div>
            </div>
          }
        </div>
        <div className="flex flex-wrap w-full gap-2">
          {
            finalList.map((el: any, idx: number) => {
              if(el.selected) {
                return(
                  <SelectedChips key={idx} text={el.label} action={() => {valueSetter(idx)}}/>
                )
              }
            })
          }
        </div>
    </div>
    )
}

const SelectedChips = (props: any) =>{
  const {text, action} = props
  return (
    <div className="flex items-center border-2 border-neutral-3 rounded-lg px-2 py-1 gap-2">
      <span className=" text-xs text-ellipsis inline-block whitespace-nowrap overflow-hidden">
        {text}
      </span>
      <span className={`cursor-pointer text-sm hover:bg-white`} onClick={action}>
        <Icon name={"XCircleIcon"}/>
      </span>
    </div>
    
  )
}