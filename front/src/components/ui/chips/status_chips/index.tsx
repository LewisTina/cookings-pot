import { useI18n } from '@/locales/client'
import ColorIndicator from "../../color_indicator"

export default function StatusChips(props: {state: number | string, label?: string}){
    const t = useI18n()
    const { state: _state, label: _label } = props
    const state = parseInt((_state).toString());

    const getStatusElements = () => {
        if(state < 2) {
            return {theme: "primary-1", label: "event"}
        }

        else if(state > 1 && state < 9) {
            return {theme: "secondary-1", label: "unprocessed_alert"}
        }
        
        else if(state > 8) {
            return {theme: "secondary-4", label: "processed_alert"}
        }

        else {
            return {theme: "primary-1", label: "event"}
        }
    }

    const {theme, label} = getStatusElements()

    return(
        <div className="flex w-fit items-center justify-center py-1 px-2 rounded-md gap-2.5"
            style={{
                backgroundColor: `rgba(var(--${theme}), 0.1)`,
                color: `rgba(var(--${theme}), 1)`,
            }}>
            <ColorIndicator style={{backgroundColor: `rgba(var(--${theme}), 1)`}}/>
            <span className="text-xs" suppressHydrationWarning>
                {_label ?? t(label as any, {})}
            </span>
        </div>
    )
}