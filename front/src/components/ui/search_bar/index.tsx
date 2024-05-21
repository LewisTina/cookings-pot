import { useI18n } from '@/locales/client';
import Icon from "../../Icons";
import IconButton from "../icon_button";

interface SearchBarProps {
    onChange?: (e: any) => void
    action?: () => void
    clear?: () => void
    placeholder?: string
    value?: string | number | (string & readonly string[]) | (number & readonly string[])
    type?: string
    name?: string
}

export default function SearchBar(props: SearchBarProps) {
    const t = useI18n()
    const {
        action,
        clear,
        placeholder,
        onChange,
        value,
        name,
      } = props
    
    return (
        <div className="flex justify-between w-full max-w-72 smd:max-w-full py-1 pl-4 pr-1 border-[2.5px] rounded-full border-primary-1">
            <input 
                type="text" 
                className="bg-transparent border-0 text-sm border-transparent outline-none flex-1"
                placeholder={placeholder ?? t("search_placeholder")}
                value={value}
                name={name}
                onChange={onChange}
                required
            />
            <IconButton 
                icon={!!value ? "XCircleIcon" : "MagnifyingGlassIcon"} 
                className="bg-primary-1 text-white" 
                size="small"
                onClick={!!value ? clear : action}
            />
        </div>
    )
}