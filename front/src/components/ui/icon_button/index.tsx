import Icon from '../../Icons';

type Props = {
    disabled?: boolean;
    size?: "medium" | "small" | "large";
    icon: string;
    iconPosition?: "right" | "left";
    className?: string;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent)=>void;
    isLoading?: boolean;
}

export default function IconButton(props: Props) {
    const { type, isLoading, size, icon, className } = props

    const sizeProps = () => {
        switch(size){
            case 'medium':
                return {iconSize: 'h-5 w-5', buttonPadding: 'p-1'}
            
            case 'small':
                return {iconSize: 'h-4 w-4', buttonPadding: 'p-1'}
            
            case 'large':
                return {iconSize: 'h-6 w-6', buttonPadding: 'p-1.5'}
          
            default:
                return {iconSize: 'h-5 w-5', buttonPadding: 'p-2'}
          
          };
    }

    const {iconSize, buttonPadding} = sizeProps()



    return (
        <button 
            className={`flex items-center justify-center w-fit disabled:opacity-35 rounded-full aspect-square ${buttonPadding} ${className ?? ''} transition-all duration-300`}
            type={type ?? 'button'}
            onClick={
                !!props.disabled 
                ? undefined 
                : props.onClick
            }
            disabled={props.disabled}>
            <Icon name={icon} className={iconSize}/>
        </button>
    )
}