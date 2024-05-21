"use client"
import * as HeroIcons from '@heroicons/react/24/solid'
const _HeroIcons : any = HeroIcons

interface IconProps {
  name: string,
  className?: string,
  }

const Icon = (props: IconProps) => {
  const {name, className: _className} = props
  const className = _className ?? "w-4 h-4"

  const DynamicIcon = _HeroIcons[name];

  return DynamicIcon ? <DynamicIcon className={className} /> : null;

};

export default Icon;
