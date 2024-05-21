import { generateRandomString } from '@/src/utils';
import { FormInput } from '..';

export default function InputTextArea(props: React.PropsWithChildren<FormInput>):JSX.Element{
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
        <div className={`w-full flex flex-col`}>
              {label ?
                <label 
                    htmlFor={props.id ? props.id : randomString} 
                    className='font-semibold bg-transparent text-black-1'
                    style={{margin: "0.5rem 1rem"}}> 
                    {label} 
                    {formError ? " *" : ""}
                </label> :
                <></>
                }
            <textarea
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
                    focus:border-primary-1
                    w-96
                    outline-none 
                    ${(formError != undefined) 
                        && (formError[name] 
                            ? "focus:border-secondary-1 ring-secondary-1/50 ring-offset ring" : ""
                    )}`}
                placeholder={placeholder}
                onKeyUp={onChange}
                {...rest}
                />
        </div>
    )
}