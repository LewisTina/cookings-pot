import ColorIndicator from "../../color_indicator"
import { useI18n } from '@/locales/client'

const BooleanChip = (props: {value?: boolean}) => {
    const t = useI18n()
    const { value } = props
    return(
      <div className="flex items-center gap-2">
        <ColorIndicator className={ value ? `bg-secondary-4` : `bg-secondary-1`}/>
        <span className="capitalize">{value ? t('yes') : t('no')}</span>
      </div>
    )
  }

export default BooleanChip