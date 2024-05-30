"use client"
import * as HeroIcons from '@heroicons/react/24/solid'
import * as HeroIconsOutline from '@heroicons/react/24/outline'
const _HeroIcons : any = HeroIcons
const _HeroIconsOutline : any = HeroIconsOutline

interface IconProps {
  name: string,
  className?: string,
  type?: "solid" | "outline"
}

const Icon = (props: IconProps) => {
  const {name, className: _className, type} = props
  const className = _className ?? "w-4 h-4"

  const DynamicIcon = type == "outline" ? _HeroIconsOutline[name] :  _HeroIcons[name];

  return DynamicIcon ? <DynamicIcon className={className} /> : null;

};

export default Icon;
