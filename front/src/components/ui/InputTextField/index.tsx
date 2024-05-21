import { generateRandomString } from '@/utils';

export type FormInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    label?:   string;
    controller:  any;
    name: string;
    onChange?: any
    formError?: any
    valueSetter?: any
}

export default function InputTextField(props: React.PropsWithChildren<FormInput>):JSX.Element{
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
    console.log(label)

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
            <input
                {...controller(name, {
                        required: formError ? true : false,
                    }
                    )}
                type={type ? type : 'text'}
                className={`
                    py-3 px-4 
                    bg-transparent text-black-1
                    border-2 border-neutral-3 
                    transition-all
                    rounded-xl
                    focus:ring focus:ring-secondary focus:ring-offset 
                    focus:border-blue-400
                    w-96 -ml-4 smd:max-w-full smd:w-full
                    outline-none
                    ${(formError != undefined) 
                        && (formError[name] 
                            ? "focus:border-secondary-1 ring-secondary-1/50 ring-offset ring" : ""
                    )}`}
                min ={min ? min : 0}
                max ={max}
                placeholder={placeholder}
                onKeyUp={onChange}
                {...rest}
                />
        </div>
    )
}