import { generateRandomString } from '@/utils';
import styles from '../textfield.module.scss'

export type FormSelect= Omit<React.InputHTMLAttributes<HTMLSelectElement>, "onChange"> & {
    label?:   string;
    controller:  any;
    name: string;
    onChange?: any
    formError?: any
    valueSetter?: any
}

export default function CustomSelect(props: React.PropsWithChildren<FormSelect>) {
    const {
        label,
        name, 
        type,
        formError, 
        onChange,
        controller ,
        placeholder,
        min,
        max,
        ...rest
    } = props

    const randomString = generateRandomString(10)
    
    return(
        <div className={`w-full flex flex-col gap-1`}>
              {label ?
                <label 
                    htmlFor={props.id ? props.id : randomString} 
                    className='font-semibold bg-transparent text-black-1'> 
                    {label} 
                    {formError ? " *" : ""}
                </label> :
                <></>
                }
            <select
                {...controller(name, {required: formError ? true : false})}
                type={type ? type : 'text'}
                className={`${styles.input} ${type == "file" ? styles.file : ""} ${(formError != undefined) ? (formError[name]? styles.error :"") : ""}`}
                placeholder={placeholder}
                onKeyUp={onChange}
                {...rest}
                />
        </div>
    )
}