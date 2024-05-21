import { useI18n } from '@/locales/client'
import React, { useRef } from "react"
import styles from "./debounce_search_table.module.scss"
import IconButton from "../../../icon_button"

export default function DebouncedInputTD({
    value: initialValue,
    isFocus,
    canFilter,
    onChange,
    onClear,
    name,
    debounce = 500,
    ...props
}: {
    value: string | number
    isFocus?: boolean,
    canFilter?: boolean
    name: string,
    onChange: (name: string, value: string | number) => void
    onClear: (name: string) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>) {
    const [value, setValue] = React.useState<any>(initialValue)
    const t = useI18n()
    const ref = useRef<HTMLInputElement>(null);

    const handleInput = (e: any) => {
        var val = e.target.value;
        setValue(val)
    }

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if(value != initialValue) {
                onChange(name, value)
            }
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value, debounce, onChange, name, initialValue])

    const handleClear = () => {
        if(value != '') {
            onClear(name)
            setValue('')
        }
    }

    return (
        <div className="relative">
            <input 
                ref={ref}
                type={props.type ?? 'text'} 
                className={styles.frame}
                placeholder={`${t("search_in")} ${props.placeholder}`}
                value={value}
                disabled={!canFilter}
                name={name}
                onChange={handleInput}/>

            <div className={styles.button}>
                <IconButton 
                    icon={"XCircleIcon"} 
                    className="bg-neutral-4 text-white" 
                    size="small"
                    disabled={value == ''}
                    onClick={() => handleClear()}
                    />
            </div>
        </div>
    )
}